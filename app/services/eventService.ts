import dayjs from 'dayjs'

import type { BrowserEvent, EditorEvent, WindowEvent } from '@/models/event'

import api from './api'

// window_events_without_browser_or_editor = filter_keyvals(window_events, "app", ["Google Chrome", "Arc", "Firefox", "Microsoft Edge", "Code"], exclude=True);
// const QUERY_STRING = `afk_events = query_bucket(find_bucket("aw-watcher-afk_"));
// not_afk = filter_keyvals(afk_events, "status", ["not-afk"]);
// window_events = query_bucket(find_bucket("aw-watcher-window_"));
// window_events = filter_period_intersect(window_events, not_afk);
// merged_window_events = merge_events_by_keys(window_events, ["app"]);
// editor_events = query_bucket(find_bucket("aw-watcher-vscode_"));
// editor_events = filter_period_intersect(editor_events, not_afk);
// merged_editor_events = merge_events_by_keys(editor_events, ["project", "file", "language"]);
// browser_events = query_bucket(find_bucket("aw-watcher-web-chrome"));
// browser_events = filter_period_intersect(browser_events, not_afk);
// merged_browser_events = merge_events_by_keys(browser_events, ["url", "title"]);
// RETURN = {
//   "window": sort_by_duration(merged_window_events),
//   "editor": sort_by_duration(merged_editor_events),
//   "browser": sort_by_duration(merged_browser_events),
// };`

const QUERY_FULL_EVENTS_STRING = `afk_events = query_bucket(find_bucket("aw-watcher-afk_"));
not_afk = filter_keyvals(afk_events, "status", ["not-afk"]);
window_events = query_bucket(find_bucket("aw-watcher-window_"));
window_events = filter_period_intersect(window_events, not_afk);
editor_events = query_bucket(find_bucket("aw-watcher-vscode_"));
editor_events = filter_period_intersect(editor_events, not_afk);
browser_events = query_bucket(find_bucket("aw-watcher-web-chrome"));
browser_events = filter_period_intersect(browser_events, not_afk);
RETURN = {
  "window": sort_by_duration(window_events),
  "editor": sort_by_duration(editor_events),
  "browser": sort_by_duration(browser_events),
};
`

const eventService = {
  getTodayEvents: async (): Promise<{
    window: WindowEvent[]
    editor: EditorEvent[]
    browser: BrowserEvent[]
  }> => {
    const OFFSET_HOURS = 4
    const today = dayjs()
    const start = today.startOf('day').add(OFFSET_HOURS, 'hour').format()
    const end = today.endOf('day').add(OFFSET_HOURS, 'hour').format()
    const rawData = await api
      .post('0/query/', {
        json: {
          timeperiods: [`${start}/${end}`],
          query: QUERY_FULL_EVENTS_STRING.split('\n'),
        },
      })
      .json()
    // @ts-expect-error type correct
    return Object.fromEntries(
      // @ts-expect-error type correct
      Object.entries(rawData?.[0]).map(([key, value]) => {
        // @ts-expect-error type correct
        return [key, value.map((event) => ({ ...event.data, ...event }))]
      }),
    )
  },
}

export default eventService
