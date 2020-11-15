export default
{
	props: ['problem', 'root'],
	methods:
	{
		get_hint() {
			if (!this.root || !this.root.hint)
				return null;

			return this.root.hint;
		},

		handle_focus() {
			if (this.problem && this.problem === this.anim_problem)
				return;

			let hint = this.get_hint();
			console.log("answer input focus hint", hint);
			if (!hint)
				return;

			hint.stop();
			hint.animate();
			this.anim_problem = this.problem;
		},
		handle_focus_out() {
			let hint = this.get_hint();
			if (!hint)
				return;
		}
	}
}
