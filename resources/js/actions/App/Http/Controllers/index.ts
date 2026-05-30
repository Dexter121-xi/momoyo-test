import MenuController from './MenuController'
import Settings from './Settings'

const Controllers = {
    MenuController: Object.assign(MenuController, MenuController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers