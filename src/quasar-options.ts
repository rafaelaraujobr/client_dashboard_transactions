import quasarLang from 'quasar/lang/pt-BR'
import quasarIconSet from 'quasar/icon-set/material-symbols-rounded'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// ..required because of selected iconSet:
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'

//A few examples for animations from Animate.css:
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'

import { AddressbarColor, Loading, Notify, Dialog, QSpinnerDots, AppFullscreen } from 'quasar'
import type { QuasarPluginOptions } from 'quasar'

// Import Quasar css
import 'quasar/src/css/index.sass'
import '@/styles/quasar-custom.sass'

export const quasarOptions: Partial<QuasarPluginOptions> = {
  plugins: { AddressbarColor, Loading, Notify, Dialog, AppFullscreen },
  config: {
    loading: {
      spinner: QSpinnerDots as any,
      message: 'Carregando...',
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'white'
    }
  },
  lang: quasarLang,
  iconSet: quasarIconSet
}