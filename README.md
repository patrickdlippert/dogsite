# dogsite
Dawgr is a React Native application for uploading, sharing and reviewing images of dogs. 

The application's main screen makes use of SectionGrid from the react-native-super-grid library. When clicking the "see more" links from the section header, the application navigates to a FullList component that uses FlatGrid (also from react-native-super-grid) to display a larger list of images in one collection. When clicking on an individual thumbnail from either view, the application redirects to the DogDetail component that constructs a simple card with a larger view of the image, description, dog breed and rating. A Slick carousel from react-native-slick is used in AdCarousel to generate a horizontally scrolling ad banner.
