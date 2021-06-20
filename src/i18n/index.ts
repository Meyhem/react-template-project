import i18next from 'i18next'
import _ from 'lodash'
import moment from 'moment'
import { initReactI18next } from 'react-i18next'
import { en } from './en'

export const primaryLanguage = 'en'
export const availableLanguages = ['en']

const languageInstance = i18next.createInstance()

languageInstance.use(initReactI18next).init({
  lng: primaryLanguage,
  supportedLngs: availableLanguages,
  defaultNS: 'core',
  resources: {
    en
  },

  fallbackLng: 'en',
  keySeparator: '.',
  missingKeyHandler: (lngs: string[], ns: string, key: string) => {
    const message = `Translation for key: ${ns}:${key} is missing in languages: ${_.join(lngs, ',')}`
    console.warn(message) // eslint-disable-line no-console
  }
})

moment.locale(primaryLanguage)

export const i18n = languageInstance
