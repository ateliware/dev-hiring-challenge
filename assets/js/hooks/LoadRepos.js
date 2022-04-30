const LoadRepos = {
    mounted() {
        const selector = "#" + this.el.id
        this.observer = new IntersectionObserver(entries => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                this.pushEventTo(selector, "load-repos", {})
            }
        })
        this.observer.observe(this.el)
    }
}
export default LoadRepos