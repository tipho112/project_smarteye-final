import googleMapFactory from '@/components/board/statistics/map'
import googleMapMarker from '@/components/board/statistics/marker'

function install (Vue, options) {
const { apiKey } = options

const googleMap = googleMapFactory(apiKey)

const components = {
  googleMap,
  googleMapMarker
  }

  Object.entries(components).forEach(([componentName, component]) => {
  Vue.component(componentName, component)
    })
  }

export default install
