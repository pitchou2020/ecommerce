
import React, { useEffect, useState } from 'react';

import Forms from '../../composant/Forms/Forms'
import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin'
import Sidebar from '../../composant/Sidebar/Sidebar';

export default function Index() {
  return (
    <>
<Sidebar/>
<NavMenuAdmin/>
<Forms />

        

    </>
  )
}
