import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { SectionHeading } from '@/components/SectionHeading'

export const metadata = {
  title: 'Verify Your Letter | A&R Asset Recovery Team',
  description:
    'Received a letter from A&R Asset Recovery Team about surplus funds from a foreclosure sale? Verify it here and learn how to claim what may be owed to you.',
}

const phone = '404-939-7882'
const email = 'renee@arassetrecovery.com'
const formspreeEndpoint = 'https://formspree.io/f/xeedrlkg'

const steps = [
  {
    number: '1',
    title: 'Free consultation',
    body: 'A short, pressure-free call to confirm whether you may be owed funds and answer your questions.',
  },
  {
    number: '2',
    title: 'We handle the paperwork',
    body: 'Claims, records requests, and documentation are prepared and filed by our team at no upfront cost to you.',
  },
  {
    number: '3',
    title: 'You get paid',
    body: 'Once the county disburses your funds, our 23% contingency fee is deducted. No recovery, no fee.',
  },
]

function normalizeRef(ref) {
  if (!ref || typeof ref !== 'string') {
    return 'direct'
  }

  return ref.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'direct'
}

export default async function VerifyPage({ searchParams }) {
  const params = await searchParams
  const ref = normalizeRef(params?.ref)
  const refLabel = ref.toUpperCase()
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    `Surplus funds inquiry - Ref ${refLabel}`,
  )}`

  return (
    <>
      <main>
        <section className="bg-[#fff8f5] py-12 sm:py-16">
          <Container>
            <div className="max-w-3xl">
              <p className="font-mono text-sm font-semibold tracking-[0.08em] text-[#8f2f62] uppercase">
                A&R Asset Recovery Team, LLC
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Reference code:{' '}
                <strong className="font-semibold text-[#8f2f62]">
                  {refLabel}
                </strong>
              </p>
              <h1 className="mt-6 font-display text-5xl font-extrabold text-[#21181d] sm:text-6xl">
                Yes, this letter is real. And the money may be too.
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-600">
                If you received our letter, public records suggest a property
                connected to you sold at a foreclosure auction for more than
                what was owed. The difference, called{' '}
                <strong className="font-semibold text-[#21181d]">
                  surplus or excess funds
                </strong>
                , may still be sitting with the county waiting to be claimed.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`tel:${phone.replaceAll('-', '')}`} color="coral">
                  Call {phone}
                </Button>
                <Button href="#verify-form" variant="outline" color="berry">
                  Start the form
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <Container>
            <div className="rounded-lg bg-[#fff8f5] p-6 ring-1 ring-[#f3d8d2]">
              <h2 className="font-display text-3xl font-bold text-[#21181d]">
                You are never asked to pay us anything upfront.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                No upfront fees, no hourly fees, and no out-of-pocket costs.
                A&R is paid only from funds actually recovered for you: a{' '}
                <strong className="font-semibold text-[#21181d]">
                  23% contingency fee
                </strong>
                . If there is no recovery, there is no fee.
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-[#4a2b3c] py-14 sm:py-20">
          <Container>
            <SectionHeading number="1" dark>
              How it works
            </SectionHeading>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-lg bg-white/7 p-6 ring-1 ring-white/12"
                >
                  <p className="font-mono text-sm font-semibold text-[#ffd8cd]">
                    0{step.number}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-bold text-white">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-white/72">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="verify-form" className="bg-white py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionHeading number="2">Verify your letter</SectionHeading>
                <h2 className="mt-8 font-display text-4xl font-bold text-[#21181d]">
                  Start right here. It takes about 60 seconds.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Send your information and Kathy will follow up, usually the
                  same day. Prefer to talk now? Call directly.
                </p>
                <div className="mt-8 rounded-lg bg-[#4a2b3c] p-6 text-center">
                  <p className="text-lg font-semibold text-white">
                    Kathy Bryant Powell, CEO
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Calls answered personally
                  </p>
                  <Button
                    href={`tel:${phone.replaceAll('-', '')}`}
                    color="coral"
                    className="mt-5"
                  >
                    Call {phone}
                  </Button>
                  <p className="mt-4 text-sm text-white/70">
                    <a className="hover:text-white" href={mailto}>
                      or email {email}
                    </a>
                  </p>
                </div>
              </div>

              <form
                action={formspreeEndpoint}
                method="post"
                className="rounded-lg bg-white p-6 shadow-xl ring-1 ring-slate-200 lg:col-span-7"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={`Verify page lead - Ref ${refLabel}`}
                />
                <input type="hidden" name="ref" value={refLabel} />
                <input type="hidden" name="source" value="QR verify page" />
                <div className="grid gap-5">
                  <label className="block">
                    <span className="text-sm font-semibold text-[#21181d]">
                      Your name
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:ring-2 focus:ring-[#8f2f62]/20 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-[#21181d]">
                      Best phone number
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:ring-2 focus:ring-[#8f2f62]/20 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-[#21181d]">
                      Property address, if you know it
                    </span>
                    <input
                      name="property_address"
                      type="text"
                      className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:ring-2 focus:ring-[#8f2f62]/20 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="mt-5 rounded-lg bg-[#fff8f5] p-4 ring-1 ring-[#f3d8d2]">
                  <label className="flex gap-3">
                    <input
                      name="contact_consent"
                      type="checkbox"
                      required
                      value="I agree to be contacted by A&R Asset Recovery Team, LLC by phone, text, or email about my inquiry."
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8f2f62] focus:ring-[#8f2f62]"
                    />
                    <span className="text-sm leading-6 text-slate-700">
                      I agree to be contacted by A&R Asset Recovery Team, LLC
                      by phone, text, or email about my inquiry.
                    </span>
                  </label>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Your information will be used to review your inquiry and
                    follow up about possible asset recovery, surplus funds,
                    overages, or unclaimed funds. We do not sell your
                    information.
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Button type="submit" color="coral">
                    Submit
                  </Button>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    No obligation. No fees unless we recover your funds.
                  </p>
                </div>
              </form>
            </div>
          </Container>
        </section>

        <section className="bg-[#fff8f5] py-14 sm:py-20">
          <Container>
            <div className="max-w-3xl text-sm leading-7 text-slate-600">
              <p>
                <strong className="font-semibold text-[#21181d]">
                  You have choices.
                </strong>{' '}
                A&R Asset Recovery Team is not a government agency or law firm.
                You may contact the county or court directly to verify and
                claim any funds independently, consult an attorney, or work
                with our team, whatever feels right to you.
              </p>
              <p className="mt-4">
                Unclaimed surplus funds can eventually revert to the county or
                state, so time matters. A&R Asset Recovery Team, LLC,
                Mableton, GA.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
