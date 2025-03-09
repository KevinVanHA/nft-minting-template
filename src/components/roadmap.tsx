import { motion } from 'framer-motion'

const Roadmap = () => {
  const steps = [
    {
      id: 1,
      title: 'Germination 🌱',
      description: 'Establishing OTG\'s premium hemp product line,  Announcing Blasted Bucks NFT collection & its real-life utility',
      percentage: '0%'
    },
    {
      id: 2,
      title: 'Watering the Soil 💦',
      description: 'Launching Canna Thoughts with Connie (Educational Twitter Spaces), NFT trait & utility reveal, Community games & contests',
      percentage: '20%'
    },
    {
      id: 3,
      title: 'Transplanting 🌿',
      description: 'No whitelist! Instead, we reward early supporters:First 200 minters get a discount & exclusive perks, Giveaways (OTG merch, CBD/Delta-THC products)',
      percentage: '40%'
    },
    {
      id: 4,
      title: 'Vegetation 🌳',
      description: 'Final NFT mint preparations, Full event details for the OTG Campout',
      percentage: '60%'
    },
    {
      id: 5,
      title: 'Flowering 🌺',
      description: 'MINT DAY 🎉 Virtual Twitter Spaces party with special guests!, Big giveaways, live raffles, and major surprises',
      percentage: '80%'
    },
    {
      id: 6,
      title: 'Harvest 🌾',
      description: 'OTG Campout kicks off 🚀, Weekly raffles, exclusive online classes & meetups, Long-term NFT utility expansion & business growth',
      percentage: '100%'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" >
      <h2 className="text-4xl font-bold text-center mb-12">Project Roadmap</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="bg-white rounded-xl p-8 shadow-lg transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">{step.id}</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200"></div>
              <span className="text-lg font-bold text-gray-600">{step.percentage}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-600 space-y-2">
              {step.description.split('\n').map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap