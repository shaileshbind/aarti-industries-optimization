import { ProductPageProps, ProductData } from '@/app/products/[productId]/product';
import Breadcrumb from '@/app/components/BreadCrumb/BreadCrumb';
import { BodyText1, BodyText2, H2, H3, SubH2 } from '@/app/components/Typography2';

const mockProductData: Record<string, ProductData> = {
  'para-dichloro-benzene': {
    id: 'para-dichloro-benzene',
    name: 'Para Dichloro Benzene',
    description: 'We are one of Indias leading manufacturers, exporters & suppliers of Nitro Benzene (NB).',
    specifications: {
      casNumber: '106-46-7',
      abbreviation: 'PDCB',
      iupacName: '1,4-Dichlorobenzene',
      chemicalFormula: 'C6H4Cl2',
      commonName: '-',
      valueChain: 'Di Chloro Benzene'
    },
    documents: {
      tds: '/documents/pdcb-tds.pdf',
      sds: '/documents/pdcb-sds.pdf',
      rds: '/documents/pdcb-rds.pdf'
    },
    chemicalStructure: {
      imageUrl: '/images/products/chemical12.png',
      altText: 'Para Dichloro Benzene molecular structure'
    },
    features: [
      'High purity grade',
      'Consistent quality',
      'Reliable supply chain',
    ],
    applications: [
      'Pesticide manufacturing',
      'Chemical synthesis',
      'Industrial processes',
    ]
  },
  'sample-product': {
    id: 'sample-product',
    name: 'Sample Chemical Product',
    description: 'Sample product for demonstration purposes.',
    specifications: {
      casNumber: '000-00-0',
      abbreviation: 'SCP',
      iupacName: 'Sample Chemical Product',
      chemicalFormula: 'C2H4O',
      commonName: 'Sample',
      valueChain: 'Sample Chain'
    },
    documents: {},
    features: ['Feature 1', 'Feature 2'],
    applications: ['Application 1', 'Application 2']
  }
};

function getProductById(productId: string): ProductData | null {
  return mockProductData[productId] || null;
}

export default function ProductInnerPage({ params }: ProductPageProps) {
  const { productId } = params;
  const product = getProductById(productId);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container my-[57px] md:!max-w-[1320px] mx-auto px-4 py-8">

        <Breadcrumb
          breadcrumbArr={[
            { title: 'Home', href: '/' },
            { title: 'Products', href: '/products' },
            { title: product.name, href: `/products/${product.id}` }
          ]}
        />

        <div className='flex justify-between flex-col md:flex-row gap-10'>

          <div className='md:w-[30%] w-full'>

            {/* Product Header */}
            <header className="mb-8">
              <H3 className="mb-4">
                {product.name}
              </H3>
              <BodyText1 className="text-lg text-gray-700 max-w-3xl">
                {product.description}
              </BodyText1>
            </header>

            {/* Documents Section */}
            <section className="bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] rounded-lg p-6 border border-orange-200">
              <SubH2 className="text-white pb-[18px]">
                Documents
              </SubH2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-[36px]">
                {product.documents.tds && (
                  <a
                    href={product.documents.tds}
                    download
                    className='flex gap-4 items-center'
                  >
                    <BodyText1 className='text-white'>TDS</BodyText1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M15 12V14C15 14.5515 14.5515 15 14 15H2C1.4485 15 1 14.5515 1 14V12C1 11.724 1.224 11.5 1.5 11.5C1.776 11.5 2 11.724 2 12V14H14V12C14 11.724 14.224 11.5 14.5 11.5C14.776 11.5 15 11.724 15 12Z" fill="white" />
                      <path d="M4.14662 8.3535C3.95112 8.158 3.95112 7.842 4.14662 7.6465C4.34212 7.451 4.65812 7.451 4.85362 7.6465L7.50012 10.293V1.5C7.50012 1.224 7.72412 1 8.00012 1C8.27612 1 8.50012 1.224 8.50012 1.5V10.293L11.1466 7.6465C11.3421 7.451 11.6581 7.451 11.8536 7.6465C12.0491 7.842 12.0491 8.158 11.8536 8.3535L8.35363 11.8535C8.15563 12.052 7.83812 12.0455 7.64612 11.8535L4.14662 8.3535Z" fill="white" />
                    </svg>
                  </a>
                )}

                {product.documents.sds && (
                  <a
                    href={product.documents.sds}
                    download
                    className='flex gap-4 items-center'
                  >
                    <BodyText1 className='text-white'>SDS</BodyText1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M15 12V14C15 14.5515 14.5515 15 14 15H2C1.4485 15 1 14.5515 1 14V12C1 11.724 1.224 11.5 1.5 11.5C1.776 11.5 2 11.724 2 12V14H14V12C14 11.724 14.224 11.5 14.5 11.5C14.776 11.5 15 11.724 15 12Z" fill="white" />
                      <path d="M4.14662 8.3535C3.95112 8.158 3.95112 7.842 4.14662 7.6465C4.34212 7.451 4.65812 7.451 4.85362 7.6465L7.50012 10.293V1.5C7.50012 1.224 7.72412 1 8.00012 1C8.27612 1 8.50012 1.224 8.50012 1.5V10.293L11.1466 7.6465C11.3421 7.451 11.6581 7.451 11.8536 7.6465C12.0491 7.842 12.0491 8.158 11.8536 8.3535L8.35363 11.8535C8.15563 12.052 7.83812 12.0455 7.64612 11.8535L4.14662 8.3535Z" fill="white" />
                    </svg>
                  </a>
                )}

                {product.documents.rds && (
                  <a
                    href={product.documents.rds}
                    download
                    className='flex gap-4 items-center'
                  >
                    <BodyText1 className='text-white'>RDS</BodyText1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M15 12V14C15 14.5515 14.5515 15 14 15H2C1.4485 15 1 14.5515 1 14V12C1 11.724 1.224 11.5 1.5 11.5C1.776 11.5 2 11.724 2 12V14H14V12C14 11.724 14.224 11.5 14.5 11.5C14.776 11.5 15 11.724 15 12Z" fill="white" />
                      <path d="M4.14662 8.3535C3.95112 8.158 3.95112 7.842 4.14662 7.6465C4.34212 7.451 4.65812 7.451 4.85362 7.6465L7.50012 10.293V1.5C7.50012 1.224 7.72412 1 8.00012 1C8.27612 1 8.50012 1.224 8.50012 1.5V10.293L11.1466 7.6465C11.3421 7.451 11.6581 7.451 11.8536 7.6465C12.0491 7.842 12.0491 8.158 11.8536 8.3535L8.35363 11.8535C8.15563 12.052 7.83812 12.0455 7.64612 11.8535L4.14662 8.3535Z" fill="white" />
                    </svg>
                  </a>
                )}
              </div>
              <button className='py-[14px] px-[22px] bg-white text-center w-full rounded-[6px]'>Enquire now</button>
            </section>

            {/* Chemical Structure Placeholder */}
            {product.chemicalStructure && (
              <section className="text-center">

                <div className="bg-gray-100 rounded-lg m-8 inline-block">

                  <img
                    src={product.chemicalStructure.imageUrl ? product.chemicalStructure.imageUrl : "/images/products/chemical12.png"}
                    alt={product.chemicalStructure.altText ? product.chemicalStructure.altText : "chemical img"}
                    className="max-w-md mx-auto"
                  />

                  <div
                    className="text-2xl font-mono text-gray-700"
                    style={{ display: product.chemicalStructure.imageUrl ? 'none' : 'block' }}
                  >
                    {product.specifications.chemicalFormula}
                  </div>
                </div>
              </section>
            )}


          </div>

          <div className='md:w-[60%] w-full'>
            {/* Product Content - Placeholder for future components */}
            <main className="space-y-8">

              <table className="min-w-full border border-gray-200 rounded-lg">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-700">CAS Number:</td>
                    <td className="px-6 py-3 text-gray-900">{product.specifications.casNumber}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-700">Abbreviation:</td>
                    <td className="px-6 py-3 text-gray-900">{product.specifications.abbreviation}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-700">IUPAC Name:</td>
                    <td className="px-6 py-3 text-gray-900">{product.specifications.iupacName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-700">Chemical Formula:</td>
                    <td className="px-6 py-3 text-gray-900 font-mono">{product.specifications.chemicalFormula}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-700">Common Name:</td>
                    <td className="px-6 py-3 text-gray-900">{product.specifications.commonName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-700">Value Chain:</td>
                    <td className="px-6 py-3 text-gray-900">{product.specifications.valueChain}</td>
                  </tr>
                </tbody>
              </table>

              {/* Features and Applications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                <section className='bg-[#F7F9FA] p-5 rounded-xl'>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Features
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-1 mr-5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                            <path d="M6.99995 14.5C7.24214 10.3887 9.47064 7.96708 14 7.50009C9.8887 7.25791 7.46704 5.02952 6.99995 0.5C6.75777 4.61146 4.52955 7.03311 0 7.50009C4.11129 7.74228 6.53296 9.97067 6.99995 14.5Z" fill="#DC4C03" />
                          </svg>
                        </span>
                        <BodyText2 className="text-gray-700">{feature}</BodyText2>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Applications */}
                <section className='bg-[#F7F9FA] p-5 rounded-xl'>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Applications
                  </h2>
                  <ul className="space-y-2">
                    {product.applications.map((application, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-1 mr-5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                            <path d="M6.99995 14.5C7.24214 10.3887 9.47064 7.96708 14 7.50009C9.8887 7.25791 7.46704 5.02952 6.99995 0.5C6.75777 4.61146 4.52955 7.03311 0 7.50009C4.11129 7.74228 6.53296 9.97067 6.99995 14.5Z" fill="#DC4C03" />
                          </svg>
                        </span>
                        <BodyText2 className="text-gray-700">{application}</BodyText2>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>


            </main>
          </div>

        </div>




      </div>
    </div>
  );
}