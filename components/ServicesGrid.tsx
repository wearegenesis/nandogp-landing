import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../constants';

const ServicesGrid: React.FC = () => {
  // 1. Estado para guardar los IDs de las tarjetas que ya han sido vistas
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  // 2. Referencia para almacenar los elementos del DOM
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 3. Configurar el IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Obtenemos el ID desde el atributo data-id
            const id = Number(entry.target.getAttribute('data-id'));
            
            // Añadimos el ID al set de visibles
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });

            // Dejamos de observar este elemento (para que la animación sea solo una vez)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Se activa cuando el 15% de la tarjeta es visible
        rootMargin: '0px 0px -50px 0px' // Un pequeño margen para que no se active justo al borde
      }
    );

    // 4. Observar cada tarjeta
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-white/80 via-white/40 to-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Servicios</h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            // Lógica para alternar dirección: Pares vienen de derecha, Impares de izquierda
            const isEven = index % 2 === 0;
            const isVisible = visibleItems.has(service.id);

            return (
              <div 
                key={service.id}
                data-id={service.id}
                ref={(el) => (cardsRef.current[index] = el)} // Guardamos la referencia
                className={`
                  group p-8 bg-light/80 backdrop-blur-sm rounded-2xl border border-secondary/20 
                  transition-all duration-700 ease-out transform-gpu
                  hover:shadow-lg hover:-translate-y-1 hover:border-accent/50
                  
                  /* Lógica de Animación */
                  ${isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${isEven ? '-translate-x-20' : 'translate-x-20'}`
                  }
                `}
              >
                <div className="mb-6 inline-flex p-3 rounded-lg bg-white shadow-sm text-primary group-hover:text-accent transition-colors">
                  <service.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark/70 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;