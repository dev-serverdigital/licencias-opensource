import React, { useState } from 'react';
import { Shield, Lock, Unlock, ChevronDown, ChevronUp, Scale, AlertCircle } from 'lucide-react';

interface License {
  id: string;
  name: string;
  shortName: string;
  category: 'permissive' | 'copyleft-strong' | 'copyleft-weak';
  freedomLevel: number;
  description: string;
  pros: string[];
  cons: string[];
  keyPoints: string[];
  compatibility: string;
  examples: string[];
}

const App: React.FC = () => {
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const licenses: License[] = [
    {
      id: 'mit',
      name: 'MIT License',
      shortName: 'MIT',
      category: 'permissive',
      freedomLevel: 95,
      description: 'Una de las licencias más permisivas y populares. Permite uso comercial, modificación y distribución con mínimas restricciones.',
      pros: [
        'Muy simple y corta',
        'Altamente permisiva',
        'Compatible con casi todas las licencias',
        'Permite uso comercial sin restricciones',
        'No requiere divulgación del código fuente'
      ],
      cons: [
        'No proporciona protección de patentes explícita',
        'No protege contra uso de marca registrada',
        'Poca protección para los autores originales'
      ],
      keyPoints: [
        'Requiere incluir el aviso de copyright',
        'Proporciona software "tal cual" sin garantías',
        'Permite sublicenciar bajo otras licencias'
      ],
      compatibility: 'Compatible con GPL, Apache, BSD y la mayoría de licencias',
      examples: ['React', 'Node.js', 'jQuery', 'Rails', '.NET Core']
    },
    {
      id: 'apache',
      name: 'Apache License 2.0',
      shortName: 'Apache 2.0',
      category: 'permissive',
      freedomLevel: 90,
      description: 'Licencia permisiva con protección de patentes explícita. Popular en proyectos empresariales.',
      pros: [
        'Protección explícita de patentes',
        'Permite uso comercial',
        'Permite sublicenciamiento',
        'Bien establecida en entornos corporativos',
        'Requiere documentar cambios significativos'
      ],
      cons: [
        'Más compleja que MIT',
        'Incompatible con GPLv2',
        'Requiere más documentación de cambios'
      ],
      keyPoints: [
        'Otorga licencia de patente explícita',
        'Requiere aviso de cambios en archivos modificados',
        'Permite incluir un archivo NOTICE'
      ],
      compatibility: 'Compatible con GPLv3, MIT, BSD. Incompatible con GPLv2',
      examples: ['Android', 'Apache HTTP Server', 'Kubernetes', 'Swift', 'TensorFlow']
    },
    {
      id: 'gpl3',
      name: 'GNU General Public License v3',
      shortName: 'GPL-3.0',
      category: 'copyleft-strong',
      freedomLevel: 70,
      description: 'Licencia copyleft fuerte que requiere que las obras derivadas también sean open source bajo GPL.',
      pros: [
        'Garantiza que el software permanezca libre',
        'Protege libertades de usuarios finales',
        'Protección contra tivoización',
        'Compatibilidad mejorada vs GPLv2',
        'Protección de patentes'
      ],
      cons: [
        'No permite uso en software propietario',
        'Puede limitar adopción comercial',
        'Complejidad legal',
        'Incompatible con App Store de Apple'
      ],
      keyPoints: [
        'Código derivado debe ser GPL',
        'Debe proporcionar código fuente',
        'Anti-tivoización incluida',
        'Terminación de licencia por violación de patentes'
      ],
      compatibility: 'Compatible con Apache 2.0, LGPL. Incompatible con licencias propietarias',
      examples: ['Linux Kernel (GPLv2)', 'GIMP', 'Bash', 'GCC', 'WordPress']
    },
    {
      id: 'lgpl',
      name: 'GNU Lesser General Public License',
      shortName: 'LGPL',
      category: 'copyleft-weak',
      freedomLevel: 80,
      description: 'Versión más permisiva de GPL que permite enlazar con software propietario.',
      pros: [
        'Permite enlazar con software propietario',
        'Mantiene el código de biblioteca libre',
        'Más flexible que GPL',
        'Buena para bibliotecas'
      ],
      cons: [
        'Más compleja que licencias permisivas',
        'Menos protección que GPL completa',
        'Puede confundir sobre obligaciones'
      ],
      keyPoints: [
        'Modificaciones a la biblioteca deben ser LGPL',
        'Aplicaciones que usan la biblioteca pueden ser propietarias',
        'Debe permitir re-enlazado de la biblioteca'
      ],
      compatibility: 'Compatible con GPL, permite enlace con código propietario',
      examples: ['Qt (versión open source)', 'GTK+', 'GNU C Library', 'FFmpeg']
    },
    {
      id: 'bsd',
      name: 'BSD 3-Clause License',
      shortName: 'BSD-3',
      category: 'permissive',
      freedomLevel: 93,
      description: 'Licencia permisiva que requiere atribución y prohíbe uso del nombre del proyecto para promoción.',
      pros: [
        'Muy permisiva',
        'Simple y clara',
        'Protege el nombre del proyecto',
        'Permite uso comercial'
      ],
      cons: [
        'No proporciona protección de patentes',
        'Sin cláusula de garantía',
        'Cláusula de no-promoción puede ser problemática'
      ],
      keyPoints: [
        'Requiere mantener aviso de copyright',
        'No usar nombre del proyecto para promoción sin permiso',
        'Sin garantías de ningún tipo'
      ],
      compatibility: 'Alta compatibilidad con la mayoría de licencias',
      examples: ['FreeBSD', 'NetBSD', 'Nginx', 'Pure-FTPd']
    },
    {
      id: 'mpl',
      name: 'Mozilla Public License 2.0',
      shortName: 'MPL-2.0',
      category: 'copyleft-weak',
      freedomLevel: 75,
      description: 'Copyleft débil por archivo. Los archivos MPL deben permanecer MPL, pero pueden combinarse con código propietario.',
      pros: [
        'Copyleft a nivel de archivo',
        'Permite mezclar con código propietario',
        'Protección de patentes',
        'Compatible con GPL y LGPL'
      ],
      cons: [
        'Complejidad en proyectos grandes',
        'Menos conocida que GPL o MIT',
        'Requiere seguimiento de qué archivos son MPL'
      ],
      keyPoints: [
        'Copyleft aplica solo a archivos MPL',
        'Archivos MPL modificados deben permanecer MPL',
        'Puede combinarse con archivos de otras licencias'
      ],
      compatibility: 'Compatible con GPL, LGPL y Apache',
      examples: ['Firefox', 'Thunderbird', 'LibreOffice (parcialmente)']
    }
  ];

  const filteredLicenses = filterCategory === 'all' 
    ? licenses 
    : licenses.filter(l => l.category === filterCategory);

  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'permissive': return 'bg-green-100 text-green-800';
      case 'copyleft-weak': return 'bg-yellow-100 text-yellow-800';
      case 'copyleft-strong': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string): string => {
    switch(category) {
      case 'permissive': return 'Permisiva';
      case 'copyleft-weak': return 'Copyleft Débil';
      case 'copyleft-strong': return 'Copyleft Fuerte';
      default: return category;
    }
  };

  const getFreedomColor = (level: number): string => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Explorador de Licencias Open Source
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Compara y analiza las principales licencias de código abierto
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-700">Filtrar por categoría</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterCategory('permissive')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === 'permissive'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <Unlock className="w-4 h-4 inline mr-1" />
              Permisivas
            </button>
            <button
              onClick={() => setFilterCategory('copyleft-weak')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === 'copyleft-weak'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Copyleft Débil
            </button>
            <button
              onClick={() => setFilterCategory('copyleft-strong')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === 'copyleft-strong'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-1" />
              Copyleft Fuerte
            </button>
          </div>
        </div>

        {/* License Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLicenses.map((license) => (
            <div
              key={license.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{license.name}</h3>
                    <p className="text-indigo-100 text-sm">{license.shortName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(license.category)}`}>
                    {getCategoryLabel(license.category)}
                  </span>
                </div>
                
                {/* Freedom Level Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Nivel de Libertad</span>
                    <span className="text-sm font-bold">{license.freedomLevel}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getFreedomColor(license.freedomLevel)}`}
                      style={{ width: `${license.freedomLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{license.description}</p>

                <button
                  onClick={() => setSelectedLicense(selectedLicense === license.id ? null : license.id)}
                  className="flex items-center justify-between w-full py-2 px-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors mb-4"
                >
                  <span className="font-semibold text-indigo-700">
                    {selectedLicense === license.id ? 'Ocultar detalles' : 'Ver detalles'}
                  </span>
                  {selectedLicense === license.id ? (
                    <ChevronUp className="w-5 h-5 text-indigo-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-700" />
                  )}
                </button>

                {/* Expanded Details */}
                {selectedLicense === license.id && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Pros */}
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Ventajas
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {license.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        Desventajas
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {license.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Puntos Clave
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {license.keyPoints.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compatibility */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1 text-sm">Compatibilidad</h4>
                      <p className="text-sm text-gray-700">{license.compatibility}</p>
                    </div>

                    {/* Examples */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Proyectos Populares</h4>
                      <div className="flex flex-wrap gap-2">
                        {license.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Guía de Categorías</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <Unlock className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-700 mb-1">Permisivas</h4>
                <p className="text-sm text-gray-600">
                  Máxima libertad. Permiten uso comercial y modificación sin requerir que el código derivado sea open source.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Scale className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-700 mb-1">Copyleft Débil</h4>
                <p className="text-sm text-gray-600">
                  Equilibrio entre libertad y protección. Permiten enlazar con código propietario pero requieren mantener abiertos ciertos componentes.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Lock className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-700 mb-1">Copyleft Fuerte</h4>
                <p className="text-sm text-gray-600">
                  Máxima protección. Todo el código derivado debe ser distribuido bajo la misma licencia open source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;