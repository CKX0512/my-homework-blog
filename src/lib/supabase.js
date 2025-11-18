import { createClient } from '@supabase/supabase-js'

// 安全地获取环境变量
const getEnvVar = (key) => {
  const value = import.meta.env[key]
  return value ? String(value).trim() : ''
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

// 验证环境变量
if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL' || !supabaseUrl.startsWith('http')) {
  console.error('❌ 错误: VITE_SUPABASE_URL 未正确配置')
  console.error('当前值:', supabaseUrl || '(未定义)')
  console.error('请在 .env 文件中设置 VITE_SUPABASE_URL')
}

if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('❌ 错误: VITE_SUPABASE_ANON_KEY 未正确配置')
  console.error('当前值:', supabaseAnonKey ? '(已设置)' : '(未定义)')
  console.error('请在 .env 文件中设置 VITE_SUPABASE_ANON_KEY')
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase 配置缺失，应用可能无法正常工作')
  console.error('请检查 .env 文件并重启开发服务器')
}

// 即使配置缺失也创建客户端，避免应用崩溃
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

