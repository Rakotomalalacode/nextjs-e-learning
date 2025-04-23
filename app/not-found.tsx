import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Not Found',
    description: 'Learning your Way',
}

import Link from 'next/link'
export default function NotFound() {
  return (
    <div>
      <h2>Désolé!</h2>
      <p>Nous ne parvenons pas à trouver le page que vous recherchez.</p>
      <p>Veuillez vérifier l'orthographe correcte de l'adresse du site web.
      Vous pouvez également accéder à notre <Link href="/">page d'accueil</Link> et utiliser les menus pour accéder à une section spécifique.</p>
    </div>
  )
}