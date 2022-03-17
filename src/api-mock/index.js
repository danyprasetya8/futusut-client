import MockAdapter from 'axios-mock-adapter'
import axios from '@/axios'

import bookModule from './modules/book'
import commonModule from './modules/common'
import serviceModule from './modules/service'

const data = [
  ...bookModule,
  ...commonModule,
  ...serviceModule
]

const mock = new MockAdapter(axios)
const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

data.forEach(d => {
  const params = [d.url]
  switch (d.method) {
  case 'GET':
    params.push({ params: d.params })
    break
  case 'PUT' || 'POST':
    params.push(d.body)
    break
  }
  mock[methodMap[d.method]](...params).reply(() => {
    const { url, method, response } = d
    /* eslint-disable */
    console.log(`%c Request [${method}] ${url}: `, 'background: #fff; color: #000;', response)
    return [status || 200, response]
  })
})
