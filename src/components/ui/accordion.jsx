import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-bg-section overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-text-main">{item.question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-text-secondary leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, className = '', columns = 1 }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  // Alternate items between columns so uneven question/answer lengths balance out.
  if (columns === 2) {
    const columnsData = [
      items.map((item, i) => ({ item, index: i })).filter((_, i) => i % 2 === 0),
      items.map((item, i) => ({ item, index: i })).filter((_, i) => i % 2 === 1),
    ];

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-start ${className}`}>
        {columnsData.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map(({ item, index }) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
