import React from 'react'
import CDMOBanner from '../components/cdmo/CDMOBanner'
import CDMOPartner from '../components/cdmo/CDMOPartner'
import CDMODriving from '../components/cdmo/CDMODriving'
import CDMOE2E from '../components/cdmo/CDMOE2E'
import CDMOSplchem from '../components/cdmo/CDMOSplchem'
import CDMOSafegreen from '../components/cdmo/CDMOSafegreen'
import GloballyCertified from '../components/GloballyCertified'
import CDMOExp from '../components/cdmo/CDMOExp'

const page = () => {
  return (
    <div>
      <CDMOBanner/>
      <CDMOPartner/>
      <CDMODriving/>
      <CDMOE2E/>
      <CDMOSplchem/>
      <CDMOSafegreen/>
       <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            title: "Ecovadis Gold Rating",
            imgSrc: "/images/award1.png",
          },
          { id: 1, title: "CDP A rating", imgSrc: "/images/award2.png" },
          { id: 2, title: "ISO 27001:2022", imgSrc: "/images/award3.png" },
        ]}
      />
      <CDMOExp/>
    </div>
  )
}

export default page
