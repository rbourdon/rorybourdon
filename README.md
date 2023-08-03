# <p align="center"><img align="center" width="160" alt="Asset 54@2x" src="https://user-images.githubusercontent.com/3112707/144092189-70e937f7-8550-4ccd-97ed-8f333f9d79f3.png"></p><p align="center">Portfolio Website</p>

<p align="center"><a href="https://www.rorybourdon.com">www.rorybourdon.com</a></p>

This is my personal portfolio website, built in late 2021 and intended to showcase my design and development skills as well as allow me to display and discuss the various projects I've worked on. I designed this site in Adobe Illustrator and built it in Visual Studio Code using Next.js.

&nbsp;

### :wrench: Technologies

**[Next.js](https://github.com/vercel/next.js)** - React, but _better:tm:_

**[Framer Motion](https://github.com/framer/motion)** - Slick animation and layout transitions

**[Styled Components](https://github.com/styled-components/styled-components)** - Modular CSS in JS

**[GraphQL](https://graphql.org/)** - Clean and simple API queries

&nbsp;

### :electric_plug: Services

**[Vercel](https://vercel.com/)** - The best Next.js integration, analytics, a generous hobby plan, and UX that sparks joy

**[Hygraph (formerly GraphCMS)](https://hygraph.com/)** - Nice headless CMS with a GraphQL API, generous free tier and great tools

&nbsp;

### 📖 Documentation

This portfolio got me hired and now I'm super busy so documentation will be added as I have time, maybe.

Click the button below to clone my Hygraph schema to a new project which you can fill out with your own content.

### [![Clone project](https://hygraph.com/button)](https://app.hygraph.com/clone/1c307b6a56ea471f88368b1e42dd7191?name=rorybourdon)

&nbsp;

There are a few MDX components you can use in the project page content field. Here's how the begining of the VRBG Project MDX looks, for example.

```
<Title>Multiplayer VR Battle Royale Prototype </Title>
<Post>
<PostVideo src={images[0].url}><Caption>A fly-through of part of the map I built. I used a mix of DEM data, procedural generation and hand sculpting.</Caption></PostVideo>
<Content>This is a prototype virtual reality multiplayer battle royale game built for the HTC Vive using Unreal Engine 4. I built this prototype entirely with blueprints and no marketplace assets. I modeled, rigged and textured everything in Blender and used blend shapes in UE4 to do animations. </Content>
<Content>Because I built so much for this project, I'll break it down into sections, starting with the map.</Content>
</Post>

<Title>The Map</Title>
<Post>
<PostImage src={images[1].url} quality={100} width={1081} height={1081}><Caption>DEM data used to create a heightmap for the landscape.</Caption></PostImage>
<Content>I started with some DEM data of an area that looked interesting in Maine, approximately 1.8km² in size. This was then modified in Photoshop to exaggerate and stylize some of the features. I brought the final image into UE4 and used it as a heightmap with the landscape system to generate the terrain.</Content>
</Post>
```
