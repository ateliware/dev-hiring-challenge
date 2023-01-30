<template>
  <div class="mb-3">
    <div class="dropdown">
      Choose a language:
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {{ label }}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#csharp" @click.prevent="changeLanguage">C#</a></li>
        <li><a class="dropdown-item" href="#java" @click.prevent="changeLanguage">Java</a></li>
        <li><a class="dropdown-item" href="#javascript" @click.prevent="changeLanguage">Javascript</a></li>
        <li><a class="dropdown-item" href="#php" @click.prevent="changeLanguage">PHP</a></li>
        <li><a class="dropdown-item" href="#python" @click.prevent="changeLanguage">Python</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LanguagesDropdown',
  data() {
    return {
      language: '',
      label: 'Language',
    }
  },
  methods: {
    changeLanguage(event) {
      let href = event.target.href
      this.language = href.substring(href.indexOf('#') + 1)
      this.label = event.target.textContent
      this.$emit('language', this.language)
    }
  }
}
</script>
