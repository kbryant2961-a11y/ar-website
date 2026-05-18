import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { SectionHeading } from '@/components/SectionHeading'
import kathyImage from '@/images/ar-assets/kathy-powell.jpg'
import kathyStoryImage from '@/images/ar-assets/kathy-powell-story.jpg'

const phone = '404-939-7882'
const email = 'renee@arassetrecovery.com'

const audiences = [
  'Former homeowners after a mortgage foreclosure',
  'Property owners after a tax deed or tax sale',
  'Heirs or family members of someone who may be owed funds',
  'People who received letters about surplus or unclaimed money',
]

const process = [
  {
    title: 'Research',
    body: 'A&R reviews county and public records to identify possible surplus funds, overages, unclaimed property, and lost assets.',
  },
  {
    title: 'Verify',
    body: 'The team helps confirm whether the funds appear tied to you, your family, or a prior property interest.',
  },
  {
    title: 'File',
    body: 'A&R prepares and submits the claim documents, handles filing costs, and works with the county or state treasury process.',
  },
  {
    title: 'Recover',
    body: 'When funds are successfully recovered, the money owed can finally get into the claimant’s hands.',
  },
]

const faqs = [
  {
    question: 'Is this real?',
    answer:
      'Yes. Surplus funds can be created when a property sells for more than the taxes, mortgage balance, fees, or other amounts owed. The exact rules vary by state and county, which is why verification matters.',
  },
  {
    question: 'How do I know if I am owed money?',
    answer:
      'A&R researches public records and helps compare the information against your identity, family relationship, or prior property. A consultation is the first step to see whether there is a possible claim.',
  },
  {
    question: 'What does it cost to start?',
    answer:
      'There are no upfront fees. A&R handles filing costs for each claim and only gets paid when funds are successfully recovered.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Timing depends on the county, state, documentation, and whether other parties are involved. Some claims move quickly, while others require more review and follow-up.',
  },
  {
    question: 'What states do you cover?',
    answer:
      'A&R works across all 50 states, with the claim process tailored to the state and county holding the funds.',
  },
]

function Eyebrow({ children }) {
  return (
    <p className="font-mono text-sm font-semibold tracking-[0.08em] text-[#8f2f62] uppercase">
      {children}
    </p>
  )
}

function Hero() {
  return (
    <header
      id="hero"
      className="overflow-hidden bg-[#fff8f5] lg:px-5"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-14 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pt-16 lg:pb-28 xl:py-28">
        <div className="relative flex items-end lg:col-span-5">
          <div className="absolute -top-20 right-1/2 -bottom-12 left-0 z-10 rounded-br-6xl bg-[#4a2b3c] md:bottom-8 lg:-inset-y-28 lg:right-full lg:left-[-100vw] lg:-mr-40" />
          <div className="relative z-10 mx-auto w-72 overflow-hidden rounded-xl bg-[#4a2b3c] shadow-xl ring-1 ring-black/10 md:w-80 lg:w-full">
            <Image
              className="aspect-[4/5] w-full object-cover object-[50%_18%]"
              src={kathyImage}
              alt="Kathy Bryant Powell of A&R Asset Recovery Team"
              priority
            />
            <div className="absolute right-4 bottom-4 left-4 rounded-md bg-white/92 p-4 shadow-md backdrop-blur">
              <p className="font-display text-xl font-bold text-[#21181d]">
                Kathy Powell
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                Helping families pursue funds they may not know are owed to
                them.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white pt-4 lg:col-span-7 lg:bg-transparent lg:pt-12 lg:pl-16 xl:pl-20">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
            <Eyebrow>Free consultation • No upfront fees</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-extrabold text-[#21181d] sm:text-6xl">
              You may be owed money after a foreclosure or tax sale.
            </h1>
            <p className="mt-5 text-2xl leading-9 text-slate-600">
              A&R helps former homeowners, heirs, and families find out whether
              surplus funds, overages, lost assets, or unclaimed money are
              waiting to be claimed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#consultation" color="coral">
                Schedule a free consultation
              </Button>
              <Button href={`tel:${phone.replaceAll('-', '')}`} variant="outline" color="berry">
                Call {phone}
              </Button>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              A&R works in all 50 states and only gets paid when funds are
              successfully recovered.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

function Explanation() {
  return (
    <section id="surplus-funds" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading number="1">Why funds go unclaimed</SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-bold text-[#21181d]">
              When a property sells for more than what was owed, the difference
              may belong to the former owner or their heirs.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              After a foreclosure, tax deed sale, or tax auction, the winning
              bid can be higher than the debt, taxes, fees, or mortgage balance.
              That remaining amount is often called a surplus, overage, or
              excess proceeds.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Those funds do not always find their way to the people who are
              entitled to them. If a claim is not filed in time, the money may
              eventually be transferred back to the state or county.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-[#fff8f5] p-6 ring-1 ring-[#f3d8d2]">
              <h3 className="font-display text-2xl font-bold text-[#21181d]">
                A&R focuses on the claim window.
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The team researches county records, helps claimants understand
                what may be owed, and prepares filings before funds are
                escheated or otherwise become harder to recover.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function WhoThisHelps() {
  return (
    <section id="who-this-helps" className="bg-[#4a2b3c] py-14 sm:py-20">
      <Container>
        <SectionHeading number="2" dark>
          Who this helps
        </SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-bold text-white">
              If the property chapter was painful, the recovery process should
              feel clear.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              A&R is built for people who may never have heard the phrase
              “surplus funds” until someone contacted them, or until a family
              member mentioned old property records.
            </p>
          </div>
          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            {audiences.map((item) => (
              <div
                key={item}
                className="rounded-lg bg-white/7 p-5 ring-1 ring-white/12"
              >
                <p className="text-base font-semibold leading-7 text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="bg-[#fff8f5] pt-14 pb-10 sm:pt-20 sm:pb-12">
      <Container>
        <SectionHeading number="3">Kathy’s story</SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Image
              className="aspect-[4/5] w-full rounded-lg object-cover object-[50%_18%] shadow-lg"
              src={kathyStoryImage}
              alt="Kathy Bryant Powell"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-bold text-[#21181d]">
              This work is personal because Kathy has been on the other side of
              the letter.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                After losing her home to foreclosure, Kathy later received
                letters saying money belonged to her. Like many people, she
                thought it sounded too good to be true.
              </p>
              <p>
                She submitted the requested documents, followed the process, and
                eventually received a check that changed her family’s financial
                situation. That experience shaped A&R’s mission: help people who
                have faced foreclosure, unpaid taxes, or lost assets recoup what
                is due to them.
              </p>
            </div>
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#f3d8d2]">
              <p className="font-display text-2xl font-semibold text-[#21181d]">
                “We would like to help you and your family get off to a new
                start by filing a successful claim and getting the money owed to
                you in your hands.”
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white pt-10 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <SectionHeading number="4">How it works</SectionHeading>
        <div className="mt-8 max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-[#21181d]">
            A calm, document-driven process from first review to filed claim.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <div
              key={step.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="font-mono text-sm font-semibold text-[#8f2f62]">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#21181d]">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function NoUpfrontFees() {
  return (
    <section id="no-upfront-fees" className="bg-[#f6754f] py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Eyebrow>No upfront fees</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-[#21181d]">
              A&R handles filing costs and only gets paid if your funds are
              successfully recovered.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="#consultation" color="slate">
              Request a callback
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#fff8f5] pt-14 pb-10 sm:pt-20 sm:pb-12">
      <Container>
        <h2 className="font-display text-4xl font-bold text-[#21181d]">
          Client words
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {[
            {
              quote:
                'Working with Kathy was a game-changer for me and my family. Her expertise and dedication in asset recovery showed me how much money was out there that I did not know I had.',
              name: 'Former claimant',
            },
            {
              quote:
                'I had all but given up hope on recovering my lost funds until I connected with Kathy. Her relentless pursuit and professionalism made all the difference.',
              name: 'Recovered funds client',
            },
          ].map((testimonial) => (
            <figure
              key={testimonial.quote}
              className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-[#f3d8d2]"
            >
              <blockquote>
                <p className="font-display text-2xl font-semibold leading-9 text-[#21181d]">
                  “{testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-[#8f2f62]">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="bg-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      <Container>
        <SectionHeading number="5">Questions</SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl font-bold text-[#21181d]">
              What people usually ask first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A consultation helps separate a real potential claim from noise,
              pressure, or confusing letters.
            </p>
          </div>
          <div className="divide-y divide-slate-200 lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-[#21181d]">
                  {faq.question}
                  <span className="text-[#8f2f62] group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Consultation() {
  return (
    <section id="consultation" className="bg-[#4a2b3c] py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading number="6" dark>
              Consultation
            </SectionHeading>
            <h2 className="mt-8 font-display text-4xl font-bold text-white">
              Ask A&R to check whether you may have a claim.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Share the best way to reach you and a few details about the
              property, foreclosure, tax sale, letter, or family connection.
            </p>
            <div className="mt-8 space-y-3 text-base text-white/80">
              <p>
                <strong className="text-white">Phone:</strong>{' '}
                <a className="hover:text-white" href={`tel:${phone.replaceAll('-', '')}`}>
                  {phone}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a className="hover:text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
              <p>
                <strong className="text-white">Address:</strong> 5284 Floyd Rd
                SW #1025, Mableton, GA 30126
              </p>
            </div>
          </div>
          <form
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
            className="rounded-lg bg-white p-6 shadow-xl lg:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#21181d]">
                  Full name
                </span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:outline-none focus:ring-2 focus:ring-[#8f2f62]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#21181d]">
                  Phone
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:outline-none focus:ring-2 focus:ring-[#8f2f62]/20"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#21181d]">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:outline-none focus:ring-2 focus:ring-[#8f2f62]/20"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#21181d]">
                  What should Kathy know?
                </span>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-[#8f2f62] focus:outline-none focus:ring-2 focus:ring-[#8f2f62]/20"
                  placeholder="Foreclosure, tax sale, unclaimed funds letter, county/state, prior property address, or family connection"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" color="coral">
                Request a callback
              </Button>
              <p className="text-sm leading-6 text-slate-500">
                Prefer phone? Call {phone}.
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <NavBar />
      <Explanation />
      <WhoThisHelps />
      <Story />
      <HowItWorks />
      <NoUpfrontFees />
      <Testimonials />
      <FAQ />
      <Consultation />
      <Footer />
    </>
  )
}
