export interface BlogFormData {
  tone: 'casual' | 'professional' | 'adventurous' | 'poetic'
  length: 'short' | 'medium' | 'long'
  audience?: string
  topics?: string
}

export interface BlogMetadata {
  keywords: string[]
  hashtags: string[]
  alt_texts: string[]
  meta_description: string
  title: string
}

export interface BlogResponse {
  blog_content: string
  keywords: string[]
  hashtags: string[]
  alt_texts: string[]
  meta_description: string
  title: string
}
