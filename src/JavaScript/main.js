function showLoading() {
  const div = document.createElement('div')
  div.classList.add('loading')

  const label = document.createElement('label')
  label.innerHTML = 'Carregando...'

  div.appendChild(label)

  document.body.appendChild(div)

  setTimeout(() => hideLoading(), 1500)
}
showLoading()
function hideLoading() {
  const loading = document.getElementsByClassName('loading')
  if (loading.length) {
    loading[0].remove()
  }
}

/* User infos */
async function getGitHubProfileInfos() {
  const url = `https://api.github.com/users/carloscunha611`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      userImage.src = data.avatar_url
      userBio.textContent = data.bio
      userImageMobile.src = data.avatar_url
    })
}

getGitHubProfileInfos()

/* Form e-mail */
class FormSubmit {
  constructor(settings) {
    this.settings = settings
    this.form = document.querySelector(settings.form)
    this.formButton = document.querySelector(settings.button)
    if (this.form) {
      this.url = this.form.getAttribute('action')
    }
    this.sendForm = this.sendForm.bind(this)
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success
  }

  displayError() {
    this.form.innerHTML = this.settings.error
  }

  getFormObject() {
    const formObject = {}
    const fields = this.form.querySelectorAll('[name]')
    fields.forEach(field => {
      formObject[field.getAttribute('name')] = field.value
    })
    return formObject
  }

  onSubmission(event) {
    event.preventDefault()
    event.target.disabled = true
    event.target.innerText = 'Enviando...'
  }

  async sendForm(event) {
    try {
      this.onSubmission(event)
      await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(this.getFormObject())
      })
      this.displaySuccess()
    } catch (error) {
      this.displayError()
      throw new Error(error)
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener('click', this.sendForm)
    return this
  }
}

const formComplete = `
<label for="name">Nome</label>
<input
  required
  id="name"
  type="text"
  name="name"
  autocomplete="off"
  placeholder="Digite seu nome aqui."
/>

<label for="email">E-mail</label>
<input
  required
  id="email"
  type="email"
  name="email"
  autocomplete="off"
  placeholder="Digite seu e-mail para contato."
/>

<label for="mensage">Mensagem</label>
<textarea
  required
  id="mensage"
  name="mensage"
  placeholder="Digite sua mensagem aqui."
></textarea>
<button class="contact button-contact" type="submit" data-button>
  Enviar
</button>
<input type="hidden" name="_captcha" value="false" />`

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success: `<h1 class='success' data-aos="fade-down">Mensagem enviada com <span class= 'success_'>sucesso</span>!</h1>
  ${formComplete}
  `,
  error: `"<h1 class='error' data-aos="fade-down">N??o foi poss??vel enviar sua mensagem.</h1>
  ${formComplete}
  `
})
formSubmit.init()

/* MENU */
const menuClose = e => {
  document.getElementById('menubutton').classList.toggle('close')
  document.getElementById('aside').classList.toggle('navBar-close')
}

const aside = document.querySelector('#aside')
const navHeight = aside.offsetHeight
function changeMenuWhenScroll() {
  if (window.scrollY >= navHeight) {
    aside.classList.add('scroll')
  } else {
    aside.classList.remove('scroll')
  }
}
const sections = document.querySelectorAll('main section[id]')
console.log(sections)
function activeMenuSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav div.buttons ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav div.buttons ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

window.addEventListener('scroll', function () {
  activeMenuSection()
  changeMenuWhenScroll()
})
