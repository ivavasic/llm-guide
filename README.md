# LLM-Guided 3D Virtual Tour

This project explores how human intent can be linked to spatially organized digital content through an LLM-based virtual guide. Rather than treating language as a simple query interface, the system interprets natural-language preferences and connects them to content distributed across an immersive environment, so the experience reflects both what the user wants and where that content lives in space.

---

📝 The project is based on the conference paper:

- Iva Vasic, Hans-Georg Fill, Ramona Quattrini, and Roberto Pierdicca. 2024. **LLM-Aided Museum Guide: Personalized Tours Based on User Preferences**. In *Extended Reality: International Conference, XR Salento 2024, Lecce, Italy, September 4–7, 2024, Proceedings, Part III*. Springer-Verlag, Berlin, Heidelberg, 249–262. https://doi.org/10.1007/978-3-031-71710-9_18


## Configurations

Local environment values in `.env` should be set up before running the project.

## Notes

- `public/pano.xml` contains the panorama configuration.
- `public/skin.js` and `public/pano2vr_player.js` are generated tour files and are excluded from version control.
- Large media folders such as `assets`, `images`, and `tiles` should be added separately if needed.
- The pano tour is created with a commercial software tool which is why some files are not inlcuded

## 📺 Demo video presented at the conference

## 📺 Demo video

<video controls width="100%">
  <source src="demo/LLM-AidedMuseumGuide_compressed.mov" type="video/quicktime">
  Your browser does not support the video tag.
</video>