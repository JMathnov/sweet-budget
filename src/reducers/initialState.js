export default {
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  },

  essentialItems: {
    toilet_paper: [{id: 'uuid', blacklisted: null}],
    gloves: [],
    mask: [],
    soap: [],
    toothpaste: [],
    sanitizer_wipes: [],
    tissues: [],
    napkins: [],
    paper_towels: []
  },

  shopping_list: {
    items: [
      {name: 'toilet_paper', quantity: 5, limit_price:  null},
      {name: 'gloves', quantity: 2, limit_price:  null},
      {name: 'soap', quantity: 1, limit_price:  null}
    ]
  },


};
