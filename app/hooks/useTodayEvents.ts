import { useQuery } from '@tanstack/react-query'

import { queries } from '@/services/queries'

const BROWSER_APP_NAME = ['Google Chrome', 'Arc', 'Firefox', 'Microsoft Edge']
const EDITOR_APP_NAME = ['Code']

const useTodayEvents = () => {
  const queryResult = useQuery(queries.events.getTodayEvents)

  const restApp = queryResult.data
    ? queryResult.data.window.filter(({ app }) => !BROWSER_APP_NAME.concat(EDITOR_APP_NAME).includes(app))
    : undefined
  const data =
    restApp && queryResult.data
      ? {
          ...queryResult.data,
          browser: sumDuration(queryResult.data.browser),
          editor: sumDuration(queryResult.data.editor),
          restApp: sumDuration(restApp),
          window: sumDuration(queryResult.data.window),
        }
      : undefined

  return {
    ...queryResult,
    data,
  }
}

/** sum duration of events */
function sumDuration(events: { duration: number }[]) {
  return {
    events,
    duration: events.reduce((acc, { duration }) => acc + duration, 0),
  }
}

export default useTodayEvents
