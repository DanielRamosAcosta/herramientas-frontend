import $ from 'jquery'
import { chunk } from 'lodash'
import { get } from 'axios'

// Importa unos posts usando AJAX y los muestra en el div #ajax en forma de columnas y filas

const waitDocument = () => new Promise(resolve => $(document).ready(resolve))

const renderCols = cols =>
  cols.map(col => `
    <div class='col-md-${12 / cols.length} post'>
      <span>${col.title}</span>
      <div>${col.body}</div>
    </div>
  `)

const renderRows = cols =>
  `<div class='row'>${cols.join('')}</div>`

const renderPosts = cols =>
  chunk(cols, 3)
  .map(renderCols)
  .map(renderRows)
  .join('')

async function main () {
  await waitDocument()
  let res = await get('https://jsonplaceholder.typicode.com/posts')
  let posts = res.data

  $('#ajax').append(renderPosts(posts))
}

main().catch(console.error)
