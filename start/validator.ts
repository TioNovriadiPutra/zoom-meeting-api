import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'fullName.required': 'Nama lengkap harus diisi!',
  'fullName.alpha': 'Nama lengkap harus berisi alfabet!',
  'email.required': 'Email harus diisi!',
  'email.email': 'Format email salah!',
  'email.unique': 'Email sudah terdaftar!',
  'password.required': 'Password harus diisi',
  'password.minLength': 'Password minimal 8 karakter!',
  'password.confirmed': 'Konfirmasi password gagal!',
})
