const CONFIG = {
    // Your CSV URL (you already have this)
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwhygsZ9TqHoqgeU7NSq9iUsKqPgbdGCV6nI_C4Phu_TyB9qCeby5GrRNsKMGYP-bYfEb-r-ur3ePF/pub?output=csv",
    
    // Apps Script URL (add later when you deploy it)
    APPS_SCRIPT_URL: null,  // TODO: Add after deploying Apps Script
    
    // Map settings
    DEFAULT_CENTER: [39.9612, -82.9988],  // Downtown Columbus
    DEFAULT_ZOOM: 12,
    MAX_DISTANCE_MILES: 15,  // Show resources within 15 miles
    
    // Complete Columbus area zip codes with coordinates
    ZIP_CODES: {
      // Outer suburbs
      "43002": [40.0669, -83.1979],   // Amlin
      "43016": [40.1043, -83.1442],   // Dublin
      "43017": [40.1121, -83.1262],   // Dublin (central)
      "43026": [40.0310, -83.1633],   // Hilliard
      "43035": [40.1980, -83.0026],   // Lewis Center
      "43054": [40.0839, -82.8088],   // New Albany
      "43068": [39.9532, -82.8037],   // Reynoldsburg
      "43081": [40.1126, -82.9198],   // Westerville
      "43082": [40.1435, -82.9076],   // Westerville (north)
      "43085": [40.0949, -83.0202],   // Worthington
      "43110": [39.8449, -82.8134],   // Canal Winchester
      "43119": [39.9418, -83.1443],   // Galloway
      "43123": [39.8761, -83.0773],   // Grove City
      "43125": [39.8649, -82.8924],   // Groveport
      "43126": [39.8080, -83.1677],   // Harrisburg
      "43137": [39.8088, -82.9631],   // Lockbourne
      "43146": [39.7849, -83.1520],   // Orient
      "43147": [39.8925, -82.7533],   // Pickerington
      "43148": [39.8431, -82.6048],   // Baltimore
      
      // Columbus city proper
      "43201": [39.9907, -83.0036],   // Short North / OSU South
      "43202": [40.0178, -83.0114],   // Clintonville / OSU North
      "43203": [39.9704, -82.9722],   // King-Lincoln / Near East
      "43204": [39.9512, -83.0825],   // Westgate / Hilltop
      "43205": [39.9568, -82.9623],   // Olde Towne East / Franklin Park
      "43206": [39.9349, -82.9825],   // German Village / Merion
      "43207": [39.8848, -82.9750],   // South Columbus
      "43209": [39.9567, -82.9303],   // Bexley
      "43210": [40.0066, -83.0287],   // OSU Campus
      "43211": [40.0153, -82.9673],   // Linden
      "43212": [39.9841, -83.0469],   // Grandview Heights
      "43213": [39.9692, -82.8792],   // Whitehall
      "43214": [40.0588, -83.0189],   // Clintonville (north)
      "43215": [39.9643, -83.0012],   // Downtown
      "43217": [39.8458, -82.9551],   // South Industrial
      "43219": [40.0099, -82.9274],   // Easton / Northeast
      "43220": [40.0476, -83.0667],   // Upper Arlington (north)
      "43221": [40.0197, -83.0699],   // Upper Arlington (central)
      "43222": [39.9620, -83.0292],   // Franklinton
      "43223": [39.9286, -83.0567],   // Southwest Columbus
      "43224": [40.0375, -82.9687],   // North Linden
      "43227": [39.9508, -82.8945],   // Eastmoor
      "43228": [39.9525, -83.1202],   // West Broad / Lincoln Village
      "43229": [40.0802, -82.9776],   // Forest Park / Northland
      "43230": [40.0343, -82.8787],   // Gahanna
      "43231": [40.0750, -82.9541],   // Blendon / Minerva Park
      "43232": [39.9179, -82.8471],   // Southeast Columbus / Brice
      "43235": [40.0978, -83.0558],   // Bethel / Worthington Hills
      "43240": [40.1475, -82.9827]    // Polaris
    },
    
    // Helper function to get neighborhood name from zip
    getNeighborhood: function(zip) {
      const neighborhoods = {
        "43002": "Amlin",
        "43016": "Dublin",
        "43017": "Dublin",
        "43026": "Hilliard",
        "43035": "Lewis Center",
        "43054": "New Albany",
        "43068": "Reynoldsburg",
        "43081": "Westerville",
        "43082": "Westerville",
        "43085": "Worthington",
        "43110": "Canal Winchester",
        "43119": "Galloway",
        "43123": "Grove City",
        "43125": "Groveport",
        "43126": "Harrisburg",
        "43137": "Lockbourne",
        "43146": "Orient",
        "43147": "Pickerington",
        "43148": "Baltimore",
        "43201": "Short North",
        "43202": "Clintonville",
        "43203": "King-Lincoln",
        "43204": "Hilltop",
        "43205": "Olde Towne East",
        "43206": "German Village",
        "43207": "South Columbus",
        "43209": "Bexley",
        "43210": "OSU Campus",
        "43211": "Linden",
        "43212": "Grandview Heights",
        "43213": "Whitehall",
        "43214": "Clintonville",
        "43215": "Downtown",
        "43217": "South Columbus",
        "43219": "Easton",
        "43220": "Upper Arlington",
        "43221": "Upper Arlington",
        "43222": "Franklinton",
        "43223": "Southwest",
        "43224": "North Linden",
        "43227": "Eastmoor",
        "43228": "West Broad",
        "43229": "Northland",
        "43230": "Gahanna",
        "43231": "Minerva Park",
        "43232": "Southeast",
        "43235": "Bethel",
        "43240": "Polaris"
      };
      return neighborhoods[zip] || "Columbus area";
    }
};