import { FormLabel, MenuItem, ListSubheader, FormControlLabel, Radio, Select, RadioGroup, FormControl, Typography } from "@mui/material";

function stringToMenuItem(string) {
    return (<MenuItem value={string}>{string}</MenuItem>);
}

const hallsOfResidence = ["Eusoff Hall", "Kent Ridge Hall", "King Edward VII Hall", "Raffles Hall", "Sheares Hall", "Temasek Hall"];
const residentialColleges = ["Ridge View Residential College", "College of Alice & Peter Tan", "NUS College", "Residential College 4", "Tembusu College"];
const studentResidences = ["UTown Residence", "Prince George's Park Residence"];

const CampusLocationMenuItems = [
    <ListSubheader>Halls of Residence</ListSubheader>,
    hallsOfResidence.map(stringToMenuItem),
    <ListSubheader>Residential Colleges</ListSubheader>,
    residentialColleges.map(stringToMenuItem),
    <ListSubheader>Student Residences</ListSubheader>,
    studentResidences.map(stringToMenuItem)
];

const mrtStations = ["Admiralty", "Aljunied", "Ang Mo Kio", "Aviation Park", "Bahar Junction", "Bartley", "Bayfront", "Bayshore", "Beauty World", "Bedok", "Bedok North", "Bedok Reservoir", "Bedok South", "Bencoolen", "Bendemeer", "Bishan", "Boon Keng", "Boon Lay", "Botanic Gardens", "Braddell", "Bras Basah", "Brickland", "Bright Hill", "Buangkok", "Bugis", "Bukit Batok", "Bukit Batok West", "Bukit Brown", "Bukit Gombak", "Bukit Panjang", "Buona Vista", "Caldecott", "Canberra", "Cantonment", "Cashew", "Changi Airport", "Changi Airport Terminal 5", "Chinatown", "Chinese Garden", "Choa Chu Kang", "Choa Chu Kang West", "City Hall", "Clarke Quay", "Clementi", "Commonwealth", "Corporation", "Dakota", "Defu", "Dhoby Ghaut", "Dover", "Downtown", "Elias", "Enterprise", "Esplanade", "Eunos", "Expo", "Farrer Park", "Farrer Road", "Fort Canning", "Founders' Memorial", "Gardens by the Bay", "Gek Poh", "Geylang Bahru", "Great World", "Gul Circle", "HarbourFront", "Havelock", "Haw Par Villa", "Hillview", "Holland Village", "Hong Kah", "Hougang", "Hume", "Jalan Besar", "Joo Koon", "Jurong East", "Jurong Hill", "Jurong Pier", "Jurong Town Hall", "Jurong West", "Kaki Bukit", "Kallang", "Katong Park", "Kembangan", "Kent Ridge", "Keppel", "Khatib", "King Albert Park", "Kovan", "Kranji", "Labrador Park", "Lakeside", "Lavender", "Lentor", "Little India", "Lorong Chuan", "Loyang", "MacPherson", "Marina Bay", "Marina South", "Marina South Pier", "Marine Parade", "Marine Terrace", "Marsiling", "Marymount", "Mattar", "Maxwell", "Mayflower", "Mount Pleasant", "Mountbatten", "Nanyang Crescent", "Nanyang Gateway", "Napier", "Newton", "Nicoll Highway", "Novena", "one-north", "Orchard", "Orchard Boulevard", "Outram Park", "Pandan Reservoir", "Pasir Panjang", "Pasir Ris", "Pasir Ris East", "Paya Lebar", "Peng Kang Hill", "Pioneer", "Potong Pasir", "Prince Edward Road", "Promenade", "Punggol", "Punggol Coast", "Queenstown", "Raffles Place", "Redhill", "Riviera", "Rochor", "Sembawang", "Sengkang", "Serangoon", "Serangoon North", "Shenton Way", "Siglap", "Simei", "Sixth Avenue", "Somerset", "Springleaf", "Stadium", "Stevens", "Sungei Bedok", "Sungei Kadut", "Tai Seng", "Tampines", "Tampines East", "Tampines North", "Tampines West", "Tan Kah Kee", "Tanah Merah", "Tanjong Katong", "Tanjong Pagar", "Tanjong Rhu", "Tavistock", "Tawas", "Teck Ghee", "Telok Ayer", "Telok Blangah", "Tengah", "Tengah Park", "Tengah Plantation", "Tiong Bahru", "Toa Payoh", "Toh Guan", "Tuas Crescent", "Tuas Link", "Tuas West Road", "Tukang", "Ubi", "Upper Changi", "Upper Thomson", "West Coast Extension", "Woodlands", "Woodlands North", "Woodlands South", "Woodleigh", "Xilin", "Yew Tee", "Yio Chu Kang", "Yishun"];

const MRTStationMenuItems = mrtStations.map(stringToMenuItem);

export default function MyLocation(props) {

    // When the radio buttons "on campus" or "off campus" are selected,
    // 1. Update the value of props.setUserOnOrOffCampus.
    // 2. Reset the value of props.userLocation to null.
    function handleChangeRadioButton(event) {
        props.setUserOnOrOffCampus(event.target.value);
        props.setUserLocation(null);
    }

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                My Location
            </Typography>

            <FormControl sx={{ display: 'block' }}>
                <FormLabel id="on-campus-or-off-campus">I stay...</FormLabel>
                <RadioGroup
                    defaultValue={props.userOnOrOffCampus}
                    value={props.userOnOrOffCampus}
                    name="radio-buttons-group"
                    onChange={handleChangeRadioButton}
                >
                    <FormControlLabel value="on campus" control={<Radio />} label="...on campus..." />
                    <FormControlLabel value="off campus" control={<Radio />} label="...off campus..." />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="location-selection">
                    {props.userOnOrOffCampus === "on campus" ? "...at..." : "...nearest to..."}
                </FormLabel>
                <Select
                    value={props.userLocation}
                    onChange={(event) => {props.setUserLocation(event.target.value)}}
                >
                    {props.userOnOrOffCampus === "on campus" ? CampusLocationMenuItems : MRTStationMenuItems}
                </Select>
            </FormControl>
        </>
    );
}