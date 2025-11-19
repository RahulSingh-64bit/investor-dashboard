// src/app/invest/page.jsx
import InvestmentCard from "@/components/Invest/InvestmentCard";

export default function InvestPage() {
  const investments = [
    {
      code: "SCR",
      name: "Stellar Cash Reserve",
      type: "Fund",
      description: "Stellar Cash Reserve - bridging the traditional and digital financial realms",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      status: "Open",
      qualified: false,
      details: [
        { label: "Start date", value: "21 Nov 2023" },
        { label: "End date", value: "20 Dec 2027" },
      ],
    },
    {
      code: "ACP",
      name: "Apex Capital Partners",
      type: "Fund",
      description: "Apex Capital Partners - where opportunity meets innovation",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      status: "Open",
      qualified: false,
      details: [
        { label: "Start date", value: "1 Nov 2023" },
        { label: "End date", value: "30 Nov 2035" },
      ],
    },
    {
      code: "GBB",
      name: "Green Brew Bond",
      type: "Debt",
      description: "Green Brew Bond is a tokenized debt instrument designed to support sustainable coffee",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      status: "Open",
      qualified: true,
      details: [
        { label: "Token price", value: "US$10" },
        { label: "Start date", value: "20 May 2024" },
        { label: "End date", value: "21 May 2028" },
        { label: "Min. investment", value: "US$1,000" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Investor App - Primary market subscription creation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <InvestmentCard key={investment.code} {...investment} />
        ))}
      </div>
    </div>
  );
}