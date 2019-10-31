<template>
    <div>
        <nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
            <router-link :to="{name:'home'}" class="navbar-brand">Hiring</router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#menu"
                aria-controls="menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{name:'favoritos'}" class="nav-link">Favoritos</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
</style>