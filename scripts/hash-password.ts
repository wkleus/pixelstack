import bcrypt from 'bcryptjs'

// one-off CLI script: run with `npx tsx scripts/hash-password.ts <password>`
// to generate the value for ADMIN_PASSWORD_HASH_B64 in .env.
// NOTE: plaintext password is NOT stored anywhere — only its hash is!!
async function main() {
  const password = process.argv[2]

  if (!password) {
    console.error('Usage: npx tsx scripts/hash-password.ts <your-password>')
    process.exit(1)
  }

  // 12 salt rounds -> for balancing security vs. hashing speed
  const hash = await bcrypt.hash(password, 12)

  // NOTE: the hash is stored as Base64 in .env because the raw bcrypt hash
  // contains "$" characters that get corrupted by .env variable expansion /
  // shell quoting — decode it back before comparing in src/auth.ts
  const hashBase64 = Buffer.from(hash, 'utf-8').toString('base64')

  console.log('\nAdd this to your .env (and to your Vercel env vars):\n')
  console.log(`ADMIN_PASSWORD_HASH_B64="${hashBase64}"`)
  console.log(
    '\n(Base64-encoded on purpose — the raw hash contains "$" characters that',
  )
  console.log(
    'get corrupted by .env variable-expansion or shell quoting. This form',
  )
  console.log('has no "$" in it, so it always survives copy-pasting intact.)')
}

main()
