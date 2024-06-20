import * as v from 'valibot'

const BucketSchema = v.object({
  id: v.string(),
  created: v.date(),
  name: v.optional(v.string()),
  type: v.string(),
  client: v.picklist(['aw-watcher-window', 'aw-watcher-afk', 'aw-webui', 'aw-watcher-vscode', 'aw-client-web']),
  hostname: v.string(),
  last_updated: v.date(),
})
export type Bucket = v.InferOutput<typeof BucketSchema>
