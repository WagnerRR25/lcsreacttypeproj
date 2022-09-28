import { AxiosError } from 'axios'

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão'))
  }

  if (error.response?.status === 401) {
    return Promise.reject(new Error('Erro de conexão'))
  }

  return Promise.reject(Error)
}




// Package                       Current    Wanted   Latest  Location                                  Depended by
// @testing-library/react         13.4.0    12.1.5   13.4.0  node_modules/@testing-library/react       lcsreacttypeproj
// @testing-library/user-event    13.5.0    13.5.0   14.4.3  node_modules/@testing-library/user-event  lcsreacttypeproj
// @types/jest                    27.5.2    27.5.2   29.0.3  node_modules/@types/jest                  lcsreacttypeproj
// @types/node                  16.11.59  16.11.62  18.7.23  node_modules/@types/node                  lcsreacttypeproj
// @types/react                  18.0.20   18.0.21  18.0.21  node_modules/@types/react                 lcsreacttypeproj
// @unform/core                  MISSING     2.1.6    2.1.6  -                                         lcsreacttypeproj
// @unform/web                   MISSING     2.1.6    2.1.6  -                                         lcsreacttypeproj
// axios                          0.27.2    0.26.1   0.27.2  node_modules/axios                        lcsreacttypeproj
// eslint                         5.12.0    8.24.0   8.24.0  node_modules/eslint                       lcsreacttypeproj
// eslint-plugin-react            7.12.4    7.31.8   7.31.8  node_modules/eslint-plugin-react          lcsreacttypeproj
// react                          17.0.1    18.2.0   18.2.0  node_modules/react                        lcsreacttypeproj
// react-number-format           MISSING     5.0.0    5.0.0  -                                         lcsreacttypeproj
// react-router-dom                6.4.0     6.4.1    6.4.1  node_modules/react-router-dom             lcsreacttypeproj
// react-scripts                   2.1.8     5.0.0    5.0.1  node_modules/react-scripts                lcsreacttypeproj
// web-vitals                      2.1.4     2.1.4    3.0.2  node_modules/web-vitals                   lcsreacttypeproj
// yup                           MISSING   0.32.11  0.32.11  -                           MISSING   0.32.11  0.32.11  - 