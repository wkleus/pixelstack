// const Imprint = () => {
//   return (
//     <div className="mx-auto max-w-xl px-4 py-16 text-sm text-gray-500 dark:text-gray-400">
//       {/* Title */}
//       <h1 className="mb-12 text-center text-2xl font-bold opacity-90">
//         Imprint
//       </h1>

//       {/* Imprint Section */}
//       <section className="space-y-4">
//         <h2 className="text-lg font-medium">
//           Information according to § 5 TMG
//         </h2>

//         <h3 className="mt-5 mb-1 text-base font-medium">Contact</h3>
//         <p>
//           Email:{' '}
//           <a
//             href="mailto:contact@pixelstack.me"
//             className="transition hover:text-cyan-500 hover:underline"
//           >
//             contact@pixelstack.me
//           </a>
//         </p>

//         <h3 className="mt-5 mb-1 text-base font-medium">
//           Responsible for the content
//         </h3>
//         <p className="opacity-80">
//           Max Mustermann
//           <br />
//           Mustermannstr. 99
//           <br />
//           10245 Berlin, Germany
//         </p>
//         <h3 className="mt-5 mb-1 text-base font-medium">
//           Liability for content
//         </h3>
//         <p className="opacity-80">
//           The contents of this website were created with care. No guarantee is
//           given for accuracy, completeness or timeliness.
//         </p>

//         <h3 className="mt-5 mb-1 text-base font-medium">Liability for links</h3>
//         <p className="leading-relaxed opacity-80">
//           External links are beyond my control. Responsibility lies with the
//           respective provider.
//         </p>

//         <h3 className="mt-5 mb-1 text-base font-medium">Copyright</h3>
//         <p className="opacity-80">
//           All content on this website is subject to German copyright law.
//         </p>
//       </section>

//       {/* Divider */}
//       <div className="my-12 h-px w-full bg-gray-300 opacity-40 dark:bg-gray-700" />

//       {/* Privacy Policy */}
//       <h1 className="mb-8 text-center text-2xl font-bold opacity-90">
//         Privacy Policy
//       </h1>

//       <section className="space-y-4">
//         <h2 className="mt-5 mb-1 text-lg font-medium">1. Overview</h2>
//         <p className="opacity-80">
//           Personal data is processed only to the extent necessary for a
//           functional website.
//         </p>

//         <h2 className="mt-5 mb-1 text-lg font-medium">2. Controller</h2>
//         <p>
//           Max Mustermann
//           <br />
//           Mustermannstr. 99
//           <br />
//           10245 Berlin, Germany
//           <br />
//           Email:{' '}
//           <a
//             href="mailto:contact@pixelstack.me"
//             className="transition hover:text-cyan-500 hover:underline"
//           >
//             contact@pixelstack.me
//           </a>
//         </p>

//         <h2 className="mt-5 mb-1 text-lg font-medium">
//           3. Data collection when visiting this website
//         </h2>
//         <p className="opacity-80">
//           Technical data (browser, OS, time of access) is collected
//           automatically for security and operation.
//         </p>

//         <h2 className="text-lg font-medium opacity-80">4. Contact form</h2>
//         <p className="leading-relaxed opacity-80">
//           Data submitted via contact form is stored for processing your request.
//         </p>

//         <h2 className="text-lg font-medium opacity-80">
//           5. Cookies and local storage
//         </h2>
//         <p className="leading-relaxed opacity-80">
//           Cookies or local storage may be used to improve usability.
//         </p>

//         <h2 className="text-lg font-medium opacity-80">6. Server log files</h2>
//         <p className="leading-relaxed opacity-80">
//           Server log files are collected automatically and cannot be assigned to
//           individuals.
//         </p>

//         <h2 className="text-lg font-medium opacity-80">7. Your rights</h2>
//         <p className="leading-relaxed opacity-80">
//           You have the right to information, correction, deletion and more
//           within legal limits.
//         </p>

//         <h2 className="text-lg font-medium opacity-80">
//           8. Online dispute resolution
//         </h2>
//         <p className="leading-relaxed opacity-80">
//           EU platform:{' '}
//           <a
//             href="https://ec.europa.eu/consumers/odr/"
//             target="_blank"
//             className="text-cyan-400 transition hover:text-cyan-300"
//           >
//             https://ec.europa.eu/consumers/odr/
//           </a>
//         </p>

//         <h2 className="text-lg font-medium opacity-80">9. Changes</h2>
//         <p className="leading-relaxed opacity-80">
//           This policy may be updated to reflect legal or functional changes.
//         </p>
//       </section>
//     </div>
//   )
// }

// export default Imprint

// src/app/impressum/page.tsx
export const dynamic = 'force-dynamic'

const Imprint = () => {
  // Environment Variables für persönliche Daten
  const name = process.env.NEXT_PUBLIC_IMPRESSUM_NAME || ''
  const street = process.env.NEXT_PUBLIC_IMPRESSUM_STREET || ''
  const city = process.env.NEXT_PUBLIC_IMPRESSUM_CITY || ''
  // const phone = process.env.NEXT_PUBLIC_IMPRESSUM_PHONE || ''
  const email = process.env.NEXT_PUBLIC_IMPRESSUM_EMAIL || ''

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-sm text-gray-500 dark:text-gray-400">
      {/* Title */}
      <h1 className="mb-12 text-center text-2xl font-bold opacity-90">
        Imprint
      </h1>

      {/* Imprint Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">
          Information according to § 5 DDG (formerly TMG)
        </h2>

        <h3 className="mt-5 mb-1 text-base font-medium">Contact</h3>
        <p>
          Email:{' '}
          <a
            href={`mailto:${email}`}
            className="transition hover:text-cyan-500 hover:underline"
          >
            {email}
          </a>
        </p>
        {/* {phone && (
          <p>
            Phone:{' '}
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="transition hover:text-cyan-500 hover:underline"
            >
              {phone}
            </a>
          </p>
        )} */}

        <h3 className="mt-5 mb-1 text-base font-medium">
          Responsible for the content
        </h3>
        <p className="opacity-80">
          {name}
          <br />
          {street}
          <br />
          {city}
          <br />
          Germany
        </p>

        <h3 className="mt-5 mb-1 text-base font-medium">
          Liability for content
        </h3>
        <p className="opacity-80">
          The contents of this website were created with care. No guarantee is
          given for accuracy, completeness or timeliness.
        </p>

        <h3 className="mt-5 mb-1 text-base font-medium">Liability for links</h3>
        <p className="leading-relaxed opacity-80">
          External links are beyond my control. Responsibility lies with the
          respective provider.
        </p>

        <h3 className="mt-5 mb-1 text-base font-medium">Copyright</h3>
        <p className="opacity-80">
          All content on this website is subject to German copyright law.
        </p>
      </section>

      {/* Divider */}
      <div className="my-12 h-px w-full bg-gray-300 opacity-40 dark:bg-gray-700" />

      {/* Privacy Policy */}
      <h1 className="mb-8 text-center text-2xl font-bold opacity-90">
        Privacy Policy
      </h1>

      <section className="space-y-4">
        <h2 className="mt-5 mb-1 text-lg font-medium">1. Overview</h2>
        <p className="opacity-80">
          Personal data is processed only to the extent necessary for a
          functional website.
        </p>

        <h2 className="mt-5 mb-1 text-lg font-medium">2. Controller</h2>
        <p>
          {name}
          <br />
          {street}
          <br />
          {city}
          <br />
          Germany
          <br />
          Email:{' '}
          <a
            href={`mailto:${email}`}
            className="transition hover:text-cyan-500 hover:underline"
          >
            {email}
          </a>
        </p>

        <h2 className="mt-5 mb-1 text-lg font-medium">
          3. Data collection when visiting this website
        </h2>
        <p className="opacity-80">
          Technical data (browser, OS, time of access) is collected
          automatically for security and operation.
        </p>

        <h2 className="text-lg font-medium opacity-80">4. Contact form</h2>
        <p className="leading-relaxed opacity-80">
          Data submitted via contact form is stored for processing your request.
        </p>

        <h2 className="text-lg font-medium opacity-80">
          5. Cookies and local storage
        </h2>
        <p className="leading-relaxed opacity-80">
          Cookies or local storage may be used to improve usability.
        </p>

        <h2 className="text-lg font-medium opacity-80">6. Server log files</h2>
        <p className="leading-relaxed opacity-80">
          Server log files are collected automatically and cannot be assigned to
          individuals.
        </p>

        <h2 className="text-lg font-medium opacity-80">7. Your rights</h2>
        <p className="leading-relaxed opacity-80">
          You have the right to information, correction, deletion and more
          within legal limits.
        </p>

        <h2 className="text-lg font-medium opacity-80">
          8. Online dispute resolution
        </h2>
        <p className="leading-relaxed opacity-80">
          EU platform:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 transition hover:text-cyan-300"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>

        <h2 className="text-lg font-medium opacity-80">9. Changes</h2>
        <p className="leading-relaxed opacity-80">
          This policy may be updated to reflect legal or functional changes.
        </p>
      </section>
    </div>
  )
}

export default Imprint
