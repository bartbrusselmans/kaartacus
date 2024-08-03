import { xml2json } from 'xml-js';

interface WorkerData {
  bggEndpoints: string[];
  contentfulEndpoint: string;
}

self.onmessage = async (event: MessageEvent<WorkerData>) => {
  const { bggEndpoints, contentfulEndpoint } = event.data;

  try {
    // Fetch data from APIs
    const responses = await fetch(bggEndpoints[0])
      .then(response => response.text())
      .then(data => xml2json(data, { compact: true, spaces: 4 }))
      .then(json => JSON.parse(json))
      .then(json => json.items.item);
    // const responses = await Promise.all(
    //   bggEndpoints.map(url =>
    //     fetch(url)
    //       .then(response => response.text())
    //       .then(data => xml2json(data, { compact: true, spaces: 4 }))
    //       .then(json => JSON.parse(json))
    //       .then(json => json.items.item),
    //   ),
    // );

    // Transform data
    const transformedData = responses.map(response => {
      // console.log(
      //   '🚀 ~ file: workers.ts:39 ~ transformedData ~ response:',
      //   typeof response,
      // );
      return transformData(response);
    });

    // Send data to CMS
    // await fetch(contentfulEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(transformedData),
    // });

    // Notify main thread that the task is done
    self.postMessage(
      // 'Data processed and sent to CMS.',
      JSON.stringify(transformedData),
    );
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    self.postMessage(`Error: ${errorMessage}`);
  }
};

const transformData = (boardgame: any): any => {
  console.log('🚀 ~ file: workers.ts:60 ~ transformData ~ data:', boardgame);
  // Implement your boardgame transformation logic here
  return {
    name: boardgame.name._text,
    image: boardgame.image._text,
    thumbnail: boardgame.thumbnail._text,
    yearPublished: boardgame.yearpublished._text,
    id: boardgame._attributes.objectid,
    objectType: boardgame._attributes.objecttype,
    subType: boardgame._attributes.subtype,
  };
};

export {};
