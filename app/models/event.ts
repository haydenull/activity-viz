import * as v from 'valibot'

const BaseEventSchema = v.object({
  id: v.number(),
  title: v.string(),
  duration: v.number(),
  timestamp: v.pipe(v.string(), v.isoTimestamp()),
})

const BrowserEventSchema = v.object({
  ...BaseEventSchema.entries,
  ...v.object({
    url: v.pipe(v.string(), v.url()),
    tabCount: v.number(),
    audible: v.boolean(),
    incognite: v.boolean(),
  }).entries,
})
export type BrowserEvent = v.InferOutput<typeof BrowserEventSchema>
const EditorEventSchema = v.object({
  ...BaseEventSchema.entries,
  ...v.object({
    project: v.string(),
    file: v.string(),
    language: v.string(),
  }).entries,
})
export type EditorEvent = v.InferOutput<typeof EditorEventSchema>
const WindowEventSchema = v.object({
  ...BaseEventSchema.entries,
  ...v.object({
    app: v.string(),
  }).entries,
})
export type WindowEvent = v.InferOutput<typeof WindowEventSchema>

const EventSchema = v.union([BrowserEventSchema, EditorEventSchema, WindowEventSchema])

export type Event = v.InferOutput<typeof EventSchema>
