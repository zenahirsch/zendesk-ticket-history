module.exports = function removeGlyphiconSvgLoader(source) {
  return source.replace(
    /,\s*url\([^)]*glyphicons-halflings-regular\.svg[^)]*\)\s*format\("svg"\)/g,
    ''
  );
};
