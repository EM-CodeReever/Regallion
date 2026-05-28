<script lang="ts">
	import { browser } from '$app/environment';
	import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';
 
	export let data: PageData;
	let { userProfile } = data;
 
	// ── Types ────────────────────────────────────────────────────────────────
 
	type Difficulty = 'easy' | 'medium' | 'hard' | 'unfair';
	type GameState = 'menu' | 'playing' | 'scoring' | 'paused' | 'end';
 
	interface DiffSettings {
		speed: number;
		cpuSpeed: number;
		cpuError: number;
		jitter: number;
	}
 
	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		color: string;
	}
 
	interface TrailPoint {
		x: number;
		y: number;
	}
 
	// ── Config ───────────────────────────────────────────────────────────────
 
	const ASPECT = 16 / 10;
 
	const DIFF_SETTINGS: Record<Difficulty, DiffSettings> = {
		easy:   { speed: 6,  cpuSpeed: 2.8, cpuError: 40, jitter: 0.3 },
		medium: { speed: 8,  cpuSpeed: 4.0, cpuError: 22, jitter: 0.5 },
		hard:   { speed: 10, cpuSpeed: 5.5, cpuError: 10, jitter: 0.7 },
		unfair: { speed: 12, cpuSpeed: 99,  cpuError: 0,  jitter: 0.2 }
	};
 
	// ── Reactive State ───────────────────────────────────────────────────────
 
	let gameState: GameState = 'menu';
	let paused = false;
	let showOptions = false;
	let p1Score = 0;
	let p2Score = 0;
	let winner = '';
	// Score display animation state
	let scoringPhase: 'in' | 'hold' | 'out' = 'in';
	let scoringProgress = 0;   // 0→1 drives the canvas animation
	let scoringTimer: ReturnType<typeof setTimeout> | null = null;
	let pendingLaunchDir: 1 | -1 = 1;
 
	// Options (bound to form inputs)
	let difficulty: Difficulty = 'easy';
	let pointsToWin = 5;
	let colP1 = '#4dabf7';
	let colP2 = '#f76808';
	let colBall = '#ffffff';
 
	// Temp options (edited in panel, committed on Save)
	let tempDifficulty: Difficulty = 'easy';
	let tempPointsToWin = 5;
	let tempColP1 = '#4dabf7';
	let tempColP2 = '#f76808';
	let tempColBall = '#ffffff';
 
	// ── Game Loop Handles ────────────────────────────────────────────────────
 
	let rafId = 0;
 
	// ── Canvas Variables (set once browser is available) ─────────────────────
 
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
 
	// Paddle dimensions — derived from canvas size
	let PW = 0, PH = 0, PAD = 0;
 
	// Paddle positions
	let p1y = 0;
	let p2y = 0;
 
	// Ball
	let bx = 0, by = 0, bvx = 0, bvy = 0;
 
	// CPU targeting
	let targetCpuY = 0;
 
	// Effects
	let particles: Particle[] = [];
	let trailPts: TrailPoint[] = [];
 
	// Input
	let mouseY = -1;
	let lastTouchY: number | null = null;
 
	// ── Helpers ───────────────────────────────────────────────────────────────
 
	function cw(): number { return canvas?.width ?? 700; }
	function ch(): number { return canvas?.height ?? 437; }
 
	function initDimensions(): void {
		PW  = cw() * 0.022;
		PH  = ch() * 0.28;
		PAD = cw() * 0.018;
		p1y = ch() / 2 - PH / 2;
		p2y = ch() / 2 - PH / 2;
		targetCpuY = ch() / 2;
	}
 
	function launchBall(dir: 1 | -1 = 1): void {
		bx = cw() / 2;
		by = ch() / 2;
		const ds = DIFF_SETTINGS[difficulty];
		const angle = Math.random() * 0.6 - 0.3;
		bvx = ds.speed * dir * Math.cos(angle);
		bvy = ds.speed * Math.sin(angle);
		trailPts = [];
	}
 
	function updateCanvasSize(): void {
		if (!browser || !canvas) return;
		const w = Math.min(canvas.parentElement?.clientWidth ?? 700, 700);
		canvas.style.width  = `${w}px`;
		canvas.style.height = `${w / ASPECT}px`;
		canvas.width  = 700;
		canvas.height = 700 / ASPECT;
	}
 
	// ── Lifecycle ─────────────────────────────────────────────────────────────
 
	function init(): void {
		if (!browser) return;
 
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		updateCanvasSize();
 
		window.addEventListener('resize', updateCanvasSize);
 
		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('touchstart', onTouchStart, { passive: false });
		canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
		canvas.addEventListener('touchend',   onTouchEnd);
 
		rafId = requestAnimationFrame(loop);
	}
 
	function destroy(): void {
		if (!browser) return;
		cancelAnimationFrame(rafId);
		if (scoringTimer) clearTimeout(scoringTimer);
		window.removeEventListener('resize', updateCanvasSize);
		canvas?.removeEventListener('mousemove', onMouseMove);
		canvas?.removeEventListener('touchstart', onTouchStart);
		canvas?.removeEventListener('touchmove',  onTouchMove);
		canvas?.removeEventListener('touchend',   onTouchEnd);
	}
 
	// ── Input Handlers ────────────────────────────────────────────────────────
 
	function onMouseMove(e: MouseEvent): void {
		if (gameState !== 'playing') return;
		const rect = canvas.getBoundingClientRect();
		const scaleY = ch() / rect.height;
		mouseY = (e.clientY - rect.top) * scaleY;
	}
 
	function onTouchStart(e: TouchEvent): void {
		e.preventDefault();
		lastTouchY = e.touches[0].clientY;
	}
 
	function onTouchMove(e: TouchEvent): void {
		e.preventDefault();
		if (gameState !== 'playing' || lastTouchY === null) return;
		const rect = canvas.getBoundingClientRect();
		const scaleY = ch() / rect.height;
		const dy = (e.touches[0].clientY - lastTouchY) * scaleY;
		p1y = Math.max(0, Math.min(ch() - PH, p1y + dy));
		lastTouchY = e.touches[0].clientY;
	}
 
	function onTouchEnd(): void {
		lastTouchY = null;
	}
 
	// ── Game Actions ──────────────────────────────────────────────────────────
 
	function startGame(): void {
		initDimensions();
		p1Score = 0;
		p2Score = 0;
		winner = '';
		particles = [];
		trailPts = [];
		gameState = 'playing';
		launchBall(Math.random() < 0.5 ? 1 : -1);
	}
 
	function togglePause(): void {
		if (gameState !== 'playing' && gameState !== 'paused') return;
		if (gameState === 'playing') {
			gameState = 'paused';
			paused = true;
		} else {
			gameState = 'playing';
			paused = false;
		}
	}
 
	function beginScoreDisplay(scoringDir: 1 | -1): void {
		gameState = 'scoring';
		pendingLaunchDir = scoringDir;
		scoringPhase = 'in';
		scoringProgress = 0;
		bx = -100; by = -100; // hide ball immediately
		trailPts = [];
		spawnParticles(
			scoringDir === -1 ? cw() * 0.25 : cw() * 0.75,
			ch() / 2,
			scoringDir === -1 ? colP2 : colP1
		);
		// Extra burst from centre
		spawnParticles(cw() / 2, ch() / 2, '#ffffff');
		// Phase timeline: 400ms ease-in → 900ms hold → 500ms ease-out → launch
		scoringTimer = setTimeout(() => {
			scoringPhase = 'hold';
			scoringTimer = setTimeout(() => {
				scoringPhase = 'out';
				scoringProgress = 1;
				scoringTimer = setTimeout(() => {
					launchBall(pendingLaunchDir);
					gameState = 'playing';
				}, 500);
			}, 900);
		}, 400);
	}
 
	function openOptions(): void {
		tempDifficulty    = difficulty;
		tempPointsToWin   = pointsToWin;
		tempColP1         = colP1;
		tempColP2         = colP2;
		tempColBall       = colBall;
		showOptions = true;
	}
 
	function saveOptions(): void {
		difficulty    = tempDifficulty;
		pointsToWin   = tempPointsToWin;
		colP1         = tempColP1;
		colP2         = tempColP2;
		colBall       = tempColBall;
		showOptions = false;
	}
 
	function cancelOptions(): void {
		showOptions = false;
	}
 
	// ── AI & Physics ──────────────────────────────────────────────────────────
 
	function moveCpu(): void {
		const ds = DIFF_SETTINGS[difficulty];
		// Drift target toward ball with error
		targetCpuY += (by - targetCpuY) * ds.jitter * 0.1;
		const err = (Math.random() * 2 - 1) * ds.cpuError;
		const aim = targetCpuY + err;
		const mid = p2y + PH / 2;
		if (mid < aim - 4) p2y += Math.min(ds.cpuSpeed, aim - mid);
		else if (mid > aim + 4) p2y -= Math.min(ds.cpuSpeed, mid - aim);
		p2y = Math.max(0, Math.min(ch() - PH, p2y));
	}
 
	function spawnParticles(x: number, y: number, color: string): void {
		for (let i = 0; i < 20; i++) {
			const angle = Math.random() * Math.PI * 2;
			const spd = 2 + Math.random() * 5;
			particles.push({ x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, life: 1, color });
		}
	}
 
	function updateBall(): void {
		if (gameState !== 'playing') return;
 
		trailPts.unshift({ x: bx, y: by });
		if (trailPts.length > 14) trailPts.pop();
 
		bx += bvx;
		by += bvy;
 
		const ballR = 6;
		const ds = DIFF_SETTINGS[difficulty];
		const MAX_SPEED = ds.speed * 1.9;
 
		// Wall bounce
		if (by - ballR < 0)        { by = ballR;        bvy = Math.abs(bvy); }
		if (by + ballR > ch())     { by = ch() - ballR; bvy = -Math.abs(bvy); }
 
		// Paddle hit helper
		const resolveHit = (paddleX: number, paddleY: number, side: 'left' | 'right'): void => {
			const rel   = (by - (paddleY + PH / 2)) / (PH / 2);
			const angle = rel * (Math.PI / 3.5);
			const spd   = Math.min(Math.hypot(bvx, bvy) * 1.04, MAX_SPEED);
			bvx = (side === 'left' ? 1 : -1) * spd * Math.cos(angle);
			bvy = spd * Math.sin(angle);
			spawnParticles(side === 'left' ? paddleX + PW : paddleX - PW, by, side === 'left' ? colP1 : colP2);
		};
 
		// Left (player) paddle
		if (
			bvx < 0 &&
			bx - ballR < PAD + PW &&
			bx + ballR > PAD &&
			by > p1y - ballR &&
			by < p1y + PH + ballR
		) {
			bx = PAD + PW + ballR;
			resolveHit(PAD, p1y, 'left');
		}
 
		// Right (CPU) paddle
		if (
			bvx > 0 &&
			bx + ballR > cw() - PAD - PW &&
			bx - ballR < cw() - PAD &&
			by > p2y - ballR &&
			by < p2y + PH + ballR
		) {
			bx = cw() - PAD - PW - ballR;
			resolveHit(cw() - PAD, p2y, 'right');
		}
 
		// Scoring — ball exits left (CPU scores)
		if (bx < -20) {
			p2Score++;
			if (p2Score >= pointsToWin) {
				endGame('CPU');
			} else {
				beginScoreDisplay(1);
			}
		}
 
		// Scoring — ball exits right (player scores)
		if (bx > cw() + 20) {
			p1Score++;
			if (p1Score >= pointsToWin) {
				endGame(userProfile?.username ?? 'Player');
			} else {
				beginScoreDisplay(-1);
			}
		}
	}
 
	function endGame(winnerName: string): void {
		gameState = 'end';
		winner = winnerName;
		// Push ball off canvas
		bx = -100; by = -100;
	}
 
	// ── Drawing ───────────────────────────────────────────────────────────────
 
	function drawPaddle(x: number, y: number, color: string): void {
		const r = PW / 2;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.roundRect(x, y, PW, PH, r);
		ctx.fill();
		// Specular highlight
		ctx.fillStyle = 'rgba(255,255,255,0.13)';
		ctx.beginPath();
		ctx.roundRect(x + PW * 0.2, y + 6, PW * 0.3, PH - 12, r * 0.4);
		ctx.fill();
	}
 
 
	function render(): void {
		if (!ctx) return;
 
		ctx.clearRect(0, 0, cw(), ch());
 
		// Background
		ctx.fillStyle = '#0d0d0f';
		ctx.fillRect(0, 0, cw(), ch());
 
		// Centre line
		ctx.setLineDash([8, 10]);
		ctx.strokeStyle = 'rgba(255,255,255,0.07)';
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(cw() / 2, 0);
		ctx.lineTo(cw() / 2, ch());
		ctx.stroke();
		ctx.setLineDash([]);
 
		// Centre circle
		ctx.strokeStyle = 'rgba(255,255,255,0.04)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(cw() / 2, ch() / 2, ch() * 0.3, 0, Math.PI * 2);
		ctx.stroke();
 
		// Ball trail
		for (let i = trailPts.length - 1; i >= 0; i--) {
			const a = (1 - i / trailPts.length) * 0.3;
			const r = 3 * (1 - i / trailPts.length);
			ctx.beginPath();
			ctx.arc(trailPts[i].x, trailPts[i].y, r, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255,255,255,${a})`;
			ctx.fill();
		}
 
		// Particles
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			ctx.beginPath();
			ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
			const alpha = Math.round(p.life * 255).toString(16).padStart(2, '0');
			ctx.fillStyle = p.color + alpha;
			ctx.fill();
			p.x += p.vx;
			p.y += p.vy;
			p.vy += 0.08; // gravity on particles
			p.life -= 0.035;
			if (p.life <= 0) particles.splice(i, 1);
		}
 
		// Paddles
		drawPaddle(PAD, p1y, colP1);
		drawPaddle(cw() - PAD - PW, p2y, colP2);
 
		// Ball
		if (gameState === 'playing') {
			ctx.beginPath();
			ctx.arc(bx, by, 6, 0, Math.PI * 2);
			ctx.fillStyle = colBall;
			ctx.fill();
		}
 
		// Score display overlay
		if (gameState === 'scoring') {
			// Advance progress
			if (scoringPhase === 'in')  scoringProgress = Math.min(scoringProgress + 0.055, 1);
			if (scoringPhase === 'out') scoringProgress = Math.max(scoringProgress - 0.055, 0);
 
			// Ease: fast attack, smooth hold
			const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
			const easeIn  = (t: number): number => t * t * t;
			const t = scoringPhase === 'out' ? easeIn(scoringProgress) : easeOut(scoringProgress);
 
			// Dimmed backdrop — vignette feel via two rects
			ctx.fillStyle = `rgba(0,0,0,${t * 0.72})`;
			ctx.fillRect(0, 0, cw(), ch());
 
			// Horizontal scan-line that sweeps down once on entry
			if (scoringPhase === 'in' || scoringPhase === 'hold') {
				const scanY = scoringProgress * ch();
				const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
				grad.addColorStop(0,   'rgba(255,255,255,0)');
				grad.addColorStop(0.5, `rgba(255,255,255,${(1 - scoringProgress) * 0.12})`);
				grad.addColorStop(1,   'rgba(255,255,255,0)');
				ctx.fillStyle = grad;
				ctx.fillRect(0, scanY - 40, cw(), 80);
			}
 
			const scorerColor  = pendingLaunchDir === -1 ? colP1 : colP2;
			const scoreSize    = ch() * 0.30;
			const labelSize    = ch() * 0.048;
			// chromatic aberration offset — strong on entry, settles by hold
			const aberration   = scoringPhase === 'in' ? (1 - scoringProgress) * 10 : 0;
 
			ctx.save();
			ctx.translate(cw() / 2, ch() / 2);
			ctx.globalAlpha = t;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
 
			// "GOAL" label — scales up from small and fades in with slight blur feel via layering
			const labelY = -ch() * 0.20;
			ctx.font = `400 ${labelSize * (0.7 + t * 0.3)}px sans-serif`;
			ctx.letterSpacing = `${t * 8}px`;
			ctx.fillStyle = `rgba(255,255,255,${t * 0.55})`;
			ctx.fillText('GOAL', 0, labelY);
			ctx.letterSpacing = '0px';
 
			// Scorer name tag below GOAL
			const nameSize = ch() * 0.052;
			ctx.font = `400 ${nameSize}px sans-serif`;
			ctx.fillStyle = scorerColor + Math.round(t * 200).toString(16).padStart(2, '0');
			const scorerLabel = pendingLaunchDir === -1 ? (userProfile?.username ?? 'Player') : 'CPU';
			ctx.fillText(scorerLabel.toUpperCase(), 0, labelY + labelSize * 1.6);
 
			// Big scores with chromatic split on the scorer's number
			ctx.font = `500 ${scoreSize}px sans-serif`;
 
			const drawScoreNum = (value: number, offsetX: number, isScorer: boolean): void => {
				const str = String(value);
				if (isScorer && aberration > 0) {
					// RGB split ghost
					ctx.globalAlpha = t * 0.35;
					ctx.fillStyle = '#ff3b3b';
					ctx.fillText(str, offsetX - aberration, 0);
					ctx.fillStyle = '#3bffee';
					ctx.fillText(str, offsetX + aberration, 0);
					ctx.globalAlpha = t;
				}
				ctx.fillStyle = isScorer ? scorerColor : 'rgba(255,255,255,0.35)';
				if (isScorer) {
					// Slight scale punch on the scorer's digit
					ctx.save();
					ctx.translate(offsetX, 0);
					const punch = scoringPhase === 'in' ? 1 + (1 - t) * 0.25 : 1;
					ctx.scale(punch, punch);
					ctx.fillText(str, 0, 0);
					ctx.restore();
				} else {
					ctx.fillText(str, offsetX, 0);
				}
			};
 
			const p1IsScorer = pendingLaunchDir === -1;
			drawScoreNum(p1Score, -cw() * 0.13, p1IsScorer);
 
			// Dash divider
			ctx.globalAlpha = t * 0.25;
			ctx.fillStyle = '#ffffff';
			ctx.font = `300 ${scoreSize * 0.4}px sans-serif`;
			ctx.fillText('—', 0, 0);
 
			ctx.font = `500 ${scoreSize}px sans-serif`;
			drawScoreNum(p2Score, cw() * 0.13, !p1IsScorer);
 
			ctx.restore();
			ctx.globalAlpha = 1;
		}
	}
 
	// ── Main Loop ─────────────────────────────────────────────────────────────
 
	function loop(): void {
		if (gameState === 'playing') {
			if (mouseY > 0) {
				p1y = Math.max(0, Math.min(ch() - PH, mouseY - PH / 2));
			}
			moveCpu();
			updateBall();
		}
 
		// Particles keep running during scoring/end for visual flair
		if (gameState === 'scoring' || gameState === 'end') {
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx; p.y += p.vy;
				p.vy += 0.08;
				p.life -= 0.035;
				if (p.life <= 0) particles.splice(i, 1);
			}
		}
 
		render();
		rafId = requestAnimationFrame(loop);
	}
 
	// ── Svelte bind:this callback ─────────────────────────────────────────────
 
	function bindCanvas(node: HTMLCanvasElement): void {
		canvas = node;
		init();
	}
 
	import { onDestroy } from 'svelte';
	onDestroy(destroy);
</script>
 
<svelte:head>
	<title>Ping Pong</title>
</svelte:head>
 
<section class="flex flex-col items-center space-y-4 px-2 py-4">
 
	<!-- Screen-size gate -->
	<div class="flex flex-col items-center justify-center text-center p-6 ping-pong-breakpoint:tall:hidden">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0"
			stroke="currentColor" class="w-20 h-20 mb-3 opacity-50">
			<path stroke-linecap="round" stroke-linejoin="round"
				d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626
				1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164
				1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5
				4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25
				3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75
				15.75M4.867 19.125h.008v.008h-.008v-.008z" />
		</svg>
		<p class="text-sm text-gray-500">Ping pong is unavailable on this screen size</p>
	</div>
 
	<!-- HUD -->
	<div class="w-full max-w-[700px] hidden ping-pong-breakpoint:tall:flex items-center justify-between
		px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-white">
		<div class="flex flex-col items-center min-w-[90px]">
			<span class="text-[10px] uppercase tracking-widest text-white/40">{userProfile?.username ?? 'You'}</span>
			<span class="text-3xl font-medium tabular-nums">{p1Score}</span>
		</div>
 
		<div class="flex flex-col items-center gap-1">
			<button
				on:click={togglePause}
				disabled={gameState === 'menu' || gameState === 'end' || gameState === 'scoring'}
				class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/20
					hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
				{#if gameState === 'paused'}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
						<path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
					</svg> Resume
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
						<path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd"/>
					</svg> Pause
				{/if}
			</button>
			<span class="text-[10px] uppercase tracking-widest text-white/30 capitalize">{difficulty}</span>
		</div>
 
		<div class="flex flex-col items-center min-w-[90px]">
			<span class="text-[10px] uppercase tracking-widest text-white/40">CPU</span>
			<span class="text-3xl font-medium tabular-nums">{p2Score}</span>
		</div>
	</div>
 
	<!-- Canvas wrapper -->
	<div class="relative w-full max-w-[700px] hidden ping-pong-breakpoint:tall:block">
		<canvas
			use:bindCanvas
			id="pingPongCanvas"
			width="700"
			height="437"
			class="w-full rounded-xl border border-white/10 block"
			style="background:#0d0d0f; aspect-ratio:16/10;"
		></canvas>
 
 
		<!-- Menu overlay -->
		{#if gameState === 'menu'}
			<div
				in:fly={{ y: 30, duration: 400 }}
				class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-black/75">
				<h1 class="text-5xl font-medium text-white tracking-tight">Ping Pong</h1>
				<p class="text-sm text-white/40">Move your mouse or drag to control your paddle</p>
				<div class="flex gap-3 mt-2">
					<button
						on:click={startGame}
						class="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
						Start Game
					</button>
					<button
						on:click={openOptions}
						class="px-6 py-2.5 rounded-lg border border-white/25 text-white text-sm hover:bg-white/10 transition-colors">
						Options
					</button>
				</div>
			</div>
		{/if}
 
		<!-- Paused overlay -->
		{#if gameState === 'paused'}
			<div
				transition:fade={{ duration: 200 }}
				class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-black/60">
				<p class="text-2xl font-medium text-white">Paused</p>
				<button
					on:click={togglePause}
					class="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
					Resume
				</button>
			</div>
		{/if}
 
		<!-- End overlay -->
		{#if gameState === 'end'}
			<div
				in:fly={{ y: 30, duration: 400 }}
				class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-black/80">
				<h2 class="text-4xl font-medium text-white">{winner} Wins!</h2>
				<p class="text-xl text-white/50 tabular-nums">{p1Score} — {p2Score}</p>
				<div class="flex gap-3 mt-2">
					<button
						on:click={startGame}
						class="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
						Play Again
					</button>
					<button
						on:click={openOptions}
						class="px-6 py-2.5 rounded-lg border border-white/25 text-white text-sm hover:bg-white/10 transition-colors">
						Options
					</button>
				</div>
			</div>
		{/if}
 
		<!-- Options panel -->
		{#if showOptions}
			<div
				transition:fade={{ duration: 180 }}
				class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-black/90 px-8 py-6">
				<h2 class="text-lg font-medium text-white mb-1">Options</h2>
 
				<div class="flex flex-col gap-3 w-full max-w-xs">
					<div class="flex items-center justify-between">
						<label class="text-sm text-white/60" for="diff-sel">Difficulty</label>
						<select
							id="diff-sel"
							bind:value={tempDifficulty}
							class="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm">
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
							<option value="unfair">Unfair</option>
						</select>
					</div>
 
					<div class="flex items-center justify-between">
						<label class="text-sm text-white/60" for="pts-win">Points to win</label>
						<input
							id="pts-win"
							type="number"
							bind:value={tempPointsToWin}
							min="1" max="21"
							class="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm w-20 text-center" />
					</div>
 
					<div class="flex items-center justify-between">
						<label class="text-sm text-white/60" for="col-p1">Your paddle</label>
						<input id="col-p1" type="color" bind:value={tempColP1} class="w-12 h-8 rounded border-0 bg-transparent cursor-pointer" />
					</div>
 
					<div class="flex items-center justify-between">
						<label class="text-sm text-white/60" for="col-p2">CPU paddle</label>
						<input id="col-p2" type="color" bind:value={tempColP2} class="w-12 h-8 rounded border-0 bg-transparent cursor-pointer" />
					</div>
 
					<div class="flex items-center justify-between">
						<label class="text-sm text-white/60" for="col-ball">Ball color</label>
						<input id="col-ball" type="color" bind:value={tempColBall} class="w-12 h-8 rounded border-0 bg-transparent cursor-pointer" />
					</div>
				</div>
 
				<div class="flex gap-3 mt-3">
					<button
						on:click={cancelOptions}
						class="px-5 py-2 rounded-lg border border-white/25 text-white text-sm hover:bg-white/10 transition-colors">
						Cancel
					</button>
					<button
						on:click={saveOptions}
						class="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
						Save
					</button>
				</div>
			</div>
		{/if}
	</div>
 
</section>
 
<style>
	canvas {
		touch-action: none;
		user-select: none;
	}
</style>