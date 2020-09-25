export default {
	props: ["animateid", "left", "top"],
	data() {
		return {
			pos : {top: null, left: null},
			timer: null
		};
	},
	methods: {
		frame_rate() {
			return 30;
		},
		animate() {
			if (this.timer)
				return;
			let delay = 1000 / this.frame_rate();

			if (this.on_start)
				this.on_start();

			this.reset();
			this.sync_element();
			console.log("Animated ", this.id, " reset to ", this.pos);
			this.timer = setInterval(() => {
				this.run_frame_step();
				this.sync_element();

				if (this.should_stop())
				{
					if (this.on_stop)
						this.on_stop();
					this.stop();
					this.reset();
				}
			}, delay);
		},
		reset() {
			this.pos.top = this.top;
			this.pos.left = this.left;
		},
		stop() {
			if (!this.timer)
				return;

			clearInterval(this.timer);
			this.timer = null;
		},
		sync_element()
		{
			let el = document.getElementById(this.animateid);
			if (!el)
				return;

			el.style.top = this.pos.top + 'px';
			el.style.left = this.pos.left + 'px';
		},

	}
}
