const groupHeadingClass = 'font-great-vibes text-[30px] leading-none text-[#721D2C] md:text-[34px]';
const nameClass = 'font-sans text-[10px] font-semibold uppercase leading-relaxed tracking-[0.08em] text-[#46141D] sm:text-[11px]';

function Names({ people, centered = false }) {
  return <ul className={`space-y-1 ${centered ? 'text-center' : 'text-left'}`}>
    {people.map((person) => <li key={`${person.role}-${person.name}`} className={nameClass}>{person.name}</li>)}
  </ul>;
}

function SectionGroup({ title, people, children, className = '' }) {
  return <section className={`border-t border-[#9B6A67]/35 py-5 sm:py-6 ${className}`}>
    <h3 className={`${groupHeadingClass} mb-3 text-center`}>{title}</h3>
    {children ?? <Names people={people} centered />}
  </section>;
}

function AccentRule() {
  return <div className="mx-auto flex w-20 items-center justify-center gap-2" aria-hidden="true">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#A77665]/70" />
    <span className="h-1 w-1 rotate-45 bg-[#A77665]" />
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#A77665]/70" />
  </div>;
}

export default function WeddingEntourage({ people = [] }) {
  const byRole = (role) => people.filter((person) => person.role === role);

  return <section className="w-full snap-start snap-always px-5 py-10 sm:px-8 sm:py-12 md:px-20 md:py-16">
    <div className="mx-auto w-full max-w-5xl rounded-md border border-[#C48C78]/55 bg-[#F3E5E8] p-1">
      <div className="relative overflow-hidden border border-[#A8796B]/30 bg-[linear-gradient(135deg,#F7EFEC_0%,#F1E2DE_52%,#F8F0ED_100%)] px-5 py-9 sm:px-10 sm:py-11 md:px-16 md:py-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#800020] via-[#56121F] to-[#800020]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-2 w-px bg-[#C48C78]/70" aria-hidden="true" />

        <header className="mb-6 text-center sm:mb-8">
          <h2 className="font-great-vibes text-6xl leading-[0.95] text-[#641626] sm:text-7xl">The Entourage</h2>
          <p className="mt-3 font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-[#641626] sm:text-[10px]">Wedding Entourage</p>
          <p className="mt-2 font-serif text-sm italic text-[#76504F] sm:text-base">The special people standing beside us on our wedding day.</p>
          <div className="mt-5"><AccentRule /></div>
        </header>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 md:gap-x-16">
          <SectionGroup title="Maid of Honor" people={byRole('Maid of Honor')} />
          <SectionGroup title="Best Man" people={byRole('Best Man')} />
        </div>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 md:gap-x-16">
          <SectionGroup title="Bridesmaids" people={byRole('Bridesmaid')} />
          <SectionGroup title="Groomsmen" people={byRole('Groomsman')} />
        </div>

        <SectionGroup title="Secondary Sponsors">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
            {['VEIL', 'CANDLE', 'CORD'].map((role) => <div key={role} className="text-center">
              <h4 className="mb-1 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A16B5E]">{role}</h4>
              <Names people={byRole(role)} centered />
            </div>)}
          </div>
        </SectionGroup>

        <SectionGroup title="Flower Girls & Bearers">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <h4 className="mb-2 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A16B5E]">Flower Girls</h4>
              <Names people={byRole('Flower Girl')} centered />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 md:gap-3">
              {['Ring Bearer', 'Bible Bearer', 'Coin Bearer', 'Banner Bearer'].map((role) => <div key={role} className="text-center">
                <h4 className="mb-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A16B5E]">{role}</h4>
                <Names people={byRole(role)} centered />
              </div>)}
            </div>
          </div>
        </SectionGroup>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 md:gap-x-16">
          <SectionGroup title="Master of Ceremony" people={byRole('Master of Ceremony')} />
          <SectionGroup title="Father" people={byRole('Father')} />
        </div>
      </div>
    </div>
  </section>;
}
