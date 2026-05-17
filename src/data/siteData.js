import logoImage from '../../images/elliot-hs_resized.png';
import collageJpg from '../../images/collage.JPG';
import editorsChoiceJpg from '../../images/elliot-editors-choice.jpg';
import youtubeIcon from '../../images/icons/youTube.svg';
import instagramIcon from '../../images/icons/instagram.svg';
import tikTokIcon from '../../images/icons/tikTok.svg';
import emailIcon from '../../images/icons/email.svg';

export const navigation = {
  main: Object.freeze([
    { label: 'home', to: '/', end: true },
    { label: 'video', to: '/video' },
    { label: '2d', to: '/drawings' },
    { label: '3d', to: '/sculpture/pipe-cleaners' },
    { label: 'about', href: '/#about' },
    { label: 'upcoming', to: '/upcoming' },
    { label: 'contact', href: '#contact' },
  ]),
  drawings: Object.freeze([
    { key: 'dragon', label: 'Dragon' },
    { key: 'godzilla', label: 'Godzilla' },
    { key: 'character', label: 'Character' },
    { key: 'sea-life', label: 'Sea Life' },
    { key: 'artillery', label: 'Artillery' },
    { key: 'geometric', label: 'Geometric' },
  ]),
};

export const heroVideo = '/videos/stopAnimation/primalCombat/PrimalCombat.m4v';
export const logo = logoImage;
export const collageImage = collageJpg;
export const editorsChoiceImage = editorsChoiceJpg;

export const socialLinks = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCrVKqBo0N40ze96_8XUwmxw',
    icon: youtubeIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/kaijualotl/',
    icon: instagramIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@kaijualotl?lang=en',
    icon: tikTokIcon,
  },
  {
    label: 'Email',
    href: 'mailto:kaijualotlart@gmail.com,kaiju@kaijualotl.com?subject=Question%20about%20your%20website&body=Hello,%20I%20have%20a%20question%20about%20your%20website.',
    icon: emailIcon,
  },
];

export const aboutText = {
  title: 'Elliot = Phoenix',
  body: 'This my stuff. No matter I will rise and rise like the Phoenix from the ashes.',
};

export const videoSections = [
  {
    title: 'Interactive',
    embeds: [
      { title: 'Do You See Me? - Pawtucket Arts Collaborative Member Show - 2025', src: 'https://www.youtube.com/embed/5e04b2SFETA?si=My_5ml9dMUQiiF2d' },
    ],
  },
  {
    title: 'Shows',
    embeds: [
      { title: 'Maker Fair Rochester - 2024', src: 'https://www.youtube.com/embed/C8S1-l8OFYI?si=ddk8XlzQVeYEeWFE' },
      { title: 'Maker Fair Coney Island - 2024', src: 'https://www.youtube.com/embed/0wZgOQaae1I' },
      { title: 'Coney Island - Godzilla Character Performer - 2024', src: 'https://www.youtube.com/embed/FlsOq608SaE' },
      { title: 'Maker Fair Syracuse - 2025', src: 'https://www.youtube.com/embed/0ZsUuhqoe90?si=BAGc9Vq843JhgODg' },
      { title: 'Maker Fair Philly - 2025', src: 'https://www.youtube.com/embed/yDBu39E-7T4?si=h6_Jm3XGX4O1tYz3' },
    ],
  },
  {
    title: 'Stop Animation',
    embeds: [
      { title: 'Primal Combat', src: 'https://www.youtube.com/embed/r-0KxjWS8vk?si=_ziI_sFsLIXDkWxw' },
      { title: 'Infection', src: 'https://www.youtube.com/embed/nVD2Kc9zxj0?si=ueHl5JRk9Qhpts5F' },
    ],
    videos: [
    { title: 'Primal Carnage', src: '/videos/stopAnimation/primalCarnage/PrimalCarnage.m4v' },
    { title: 'MARS', src: '/videos/stopAnimation/mars/Mars.m4v' },
    ]
  },
  {
    title: 'Animation',
    videos: [
      { title: 'Cyan and the Lady Bug', src: '/videos/cyan-and-the-ladybug_edited.mp4', muted: true },
      { title: 'Ball', src: '/videos/ball.mp4', muted: true },
      { title: 'Pulverizer', src: '/videos/Cards/CardPulverizer.m4v' },
      { title: 'Apostle', src: '/videos/Cards/CardApostle.m4v' },
      { title: 'Berserker', src: '/videos/Cards/CardBerserker.m4v' },
      { title: 'Diamond', src: '/videos/Cards/CardDiamond.m4v' },
    ],
  },
  {
    title: 'Narrative',
    videos: [
      { title: 'Coney Island', src: '/videos/ConeyIsland.m4v' },
      { title: 'Gator Girl', src: '/videos/GATOR GIRL.m4v' },
      { title: 'NOLA', src: '/videos/NOLA.m4v' },
      { title: 'The Swim', src: '/videos/Swim.m4v' },
      { title: 'The Sea', src: '/videos/The Sea.m4v' },
      { title: 'Turtle Hospital', src: '/videos/TurtleHospital_09-10-23.m4v' },
    ],
  },
];

export const upcoming = {
  upcomingExhibitions: [
    'Rochester Maker Faire - Nov 14 2025',
    'Utica NY Anime Fest - Feb 28, 2026',
    'Kid Con Nashua NH - April 12, 2026',
    'Philadelphia Maker Faire - Aperil 19, 2026',
  ],
  pastExhibitions: [
    'RI Comic Con 2025 - Featured Artist Vendor - November 7-9, 2025',
    'Coney Island Maker Faire - 2025',
    'San Francisco Maker Faire - 2025',
    'Long Island Maker Faire - 2025',
    'Granite State Comic Con - 2025',
    'Providence Maker Faire - 2025',
    'RI Anime Convention - 2025',
    'Pawtucket Arts Collaborative 25th anniversary event - 2025',
    'Kaiju Alotl Midnight Zone interactive experience - Pawtucket Arts Fall Festival - 2025',
    'Do you See Me - Pawtucket Arts Collaborative Member Show May - 2025',
    'Syracuse Maker Faire May - 2025',
    'Philadelphia Maker Faire April - 2025',
    'Rochester Maker Faire November - 2024',
    'Coney Island Maker Faire October - 2024',
    'Godzilla Character Performer - Coney Island NY Mermaid Parade 2015 - Present',
  ],
  awards: [
    'Editors Choice Award San Francisco Maker Fair - 2025',
    'City of Pawtucket Art Grant 2025 for Kaiju Alotl Midnight Zone interactive experience - 2025',
  ],
  press: [
    {
      label: 'Motif Magazine - Attack of the Pipe Cleaner Creatures! - 2025',
      href: 'https://motifri.com/?s=elliot+Langston',
    },
  ],
};
