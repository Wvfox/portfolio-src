import { animations } from './modules/animation.js'
import { isWebp } from './modules/imageFormat.js'
import { navigation } from './modules/navigation.js'
import { popup } from './modules/popup.js'
import { slider } from './modules/sliders.js'
import { spoilersActivate } from './modules/spoilers.js'
import { fillProgressBar } from './modules/statisticsItems.js'
import { typedJs } from './modules/typedJs.js'

isWebp()
fillProgressBar()
navigation()
typedJs()
popup()
slider()
animations()
spoilersActivate()
