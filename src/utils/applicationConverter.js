/*Copyright (C) 2024 European Union

 __

Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the

European Commission – subsequent versions of the EUPL (the “Licence”);

You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:

*

https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

*

Unless required by applicable law or agreed to in writing, software distributed under

the Licence is distributed on an “AS IS” basis, WITHOUT WARRANTIES OR CONDITIONS

OF ANY KIND, either express or implied. See the Licence for the specific language

governing permissions and limitations under the Licence.*/
import { i18n } from "@/main";

export const convertDataForCreate = (application) => {
  return {
    title: application.title,
    datasets: convertDatasets(application.datasets, application.hubDatasets),
    inputLanguage: application.inputLanguage,
  };
};

export const convertForApplicationPreview = (applications, hubDatasets, expandedAccordions) => {
  const combineDistributions = (hubDataset) => [
    ...(hubDataset.distributions ?? []),
    ...(hubDataset.distributions_sample ?? []),
    ...(hubDataset.distributions_analytics ?? [])
  ];

  const findApplicationDistributions = (datasetDistributions, allHubDistributions) =>
    datasetDistributions
    .map(distribution =>
      allHubDistributions.find(hubDist => hubDist.id === distribution.distribution_id)
    )
    .filter(Boolean); // Remove undefined matches

  const updateDataset = (dataset, hubDataset, appId) => {
    const allHubDistributions = combineDistributions(hubDataset);

    return {
      ...dataset,
      ...hubDataset,
      displayContent: expandedAccordions.length > 0
        ? expandedAccordions.some(
          item => item.applicationId === appId && item.datasetId === dataset.dataset_id
        )
        : false,
      distributions: findApplicationDistributions(dataset.distributions, allHubDistributions)
    };
  };

  return applications.map(app => {
    const foundDatasets = [];
    const updatedDatasets = app.datasets
    .map(dataset => {
      const hubDataset = hubDatasets.find(hub => hub.id === dataset.dataset_id);
      if (!hubDataset) return null;

      foundDatasets.push(hubDataset.id);
      return updateDataset(dataset, hubDataset, app._id);
    })
    .filter(dataset => dataset && foundDatasets.includes(dataset.dataset_id));

    return { ...app, datasets: updatedDatasets };
  });
};



export const convertToApplication = (application, hubDatasets) => {
  // Build a quick lookup of valid hub dataset IDs
  const validHubIds = new Set((hubDatasets ?? []).map(h => h.id));

  const foundDatasets = [];
  const updatedDatasets = (application.datasets ?? []).map(dataset => {
    const hubDataset = hubDatasets.find(hub => hub.id === dataset.dataset_id);
    if (!hubDataset) return null;

    foundDatasets.push(hubDataset.id);
    hubDataset.displayContent = false;

    // Combine all types of distributions into one array
    const allHubDatasetDistributions = [
      ...(hubDataset.distributions ?? []),
      ...(hubDataset.distributions_sample ?? []),
      ...(hubDataset.distributions_analytics ?? []),
    ];

    const applicationDistributions = (dataset.distributions ?? [])
    .map(distribution =>
      allHubDatasetDistributions.find(hubDist => hubDist.id === distribution.distribution_id)
    )
    .filter(Boolean);

    return {
      ...dataset,
      ...hubDataset,
      distributions: applicationDistributions,
    };
  });

  // Keep only datasets that matched hubDatasets
  application.datasets = (updatedDatasets ?? []).filter(
    d => d && foundDatasets.includes(d.dataset_id)
  );

  // ❗ Remove datasetVariables whose datasetId (or dataset_id) is not in hubDatasets
  const vars = application?.form?.section1?.datasetVariables;
  if (Array.isArray(vars)) {
    application.form.section1.datasetVariables = vars.filter(v => {
      const id = v?.datasetId ?? v?.dataset_id; // be robust to either key
      // Keep if no datasetId specified OR it exists in hub
      return !id || validHubIds.has(id);
    });
  }

  return application;
};


export const convertToApplicationCountries = (hubDatasets) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const labels = hubDatasets.map(hubDataset => hubDataset.country.label);
    return [...new Set(labels)];
  } else {
    return [];
  }
}

export const convertToApplicationCountriesWithIds = (hubDatasets) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const seen = new Set();
    const countries = [];

    for (const hubDataset of hubDatasets) {
      const country = hubDataset.country;
      if (country && !seen.has(country.id)) {
        seen.add(country.id);
        countries.push({
          id: country.id,
          label: country.label
        });
      }
    }

    return countries;
  } else {
    return [];
  }
};



export const convertToApplicationDataHolders = (hubDatasets, country) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const filteredDatasets = hubDatasets.filter(hubDataset => {
      const hasPublisherName = hubDataset.custodian?.name;
      const hasCountryLabel = country ? hubDataset.country && hubDataset.country.label === country : true;
      return hasPublisherName && hasCountryLabel;
    });

    const labels = filteredDatasets.map(hubDataset => hubDataset.custodian.name);
    return [...new Set(labels)];
  } else {
    return [];
  }
}

export const convertToApplicationHDABs = (hubDatasets) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const labels = hubDatasets.filter(hubDataset => hubDataset.hdab?.name)
      .map(hubDataset => hubDataset.hdab.name);
    return [...new Set(labels)];
  } else {
    return [];
  }
}

export const convertToApplicationHDABsForSelectedCountry = (activeCountry, hubDatasets) => {
  if (hubDatasets?.length) {
    const labels = hubDatasets
    .filter(hubDataset => hubDataset.hdab?.name && hubDataset.catalog?.country?.label === activeCountry)
    .map(hubDataset => hubDataset.hdab.name);
    return [...new Set(labels)];
  }
  return [];
}

export const convertToApplicationDatabases = (hubDatasets, country) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const filteredDatasets = hubDatasets.filter(hubDataset => {
      return country ? hubDataset.country && hubDataset.country.label === country : true;
    });
    const provenances = filteredDatasets.map(hubDataset => hubDataset.provenance || []);
    const labels = provenances
      .map((provenance) => provenance[i18n.global.locale.value] ?? provenance['en'])
      .filter(Boolean);
    return [...new Set(labels)];
  } else {
    return [];
  }
};

export const convertToApplicationDatasets = (hubDatasets, country) => {
  if (hubDatasets && hubDatasets.length > 0) {
    const labels = hubDatasets
      .filter(hubDataset => hubDataset.country.label === country) // Filter datasets by country
      .map(hubDataset => hubDataset.title);
    return [...new Set(labels)];
  } else {
    return [];
  }
}

export const getDatasetTitleFromDataset = (hubDatasets, datasetId, language) => {
  if (!hubDatasets || hubDatasets.length === 0) {
    return "";
  }

  const dataset = hubDatasets.find(hubDataset => hubDataset.id === datasetId);
  if (!dataset || !dataset.title) {
    return "";
  }

  // Try in the correct language
  if (dataset.title[language]) {
    return dataset.title[language];
  }

  // Otherwise return the default language
  if (dataset.title["en"]) {
    return dataset.title["en"];
  }

  return "";
}

export const convertToApplicationCatalogId = (hubDatasets, country) => {
  // Filter datasets by country and map to catalog.id
  const labels = hubDatasets
  .filter(hubDataset => hubDataset.country.label === country) // Filter datasets by country
  .map(hubDataset => hubDataset.catalog.id);
  return [...new Set(labels)];
};

export const convertDatasets = (datasets, hubDatasets) => {
  return (datasets ?? []).map(dataset => {
    const hub = hubDatasets.find(h => h.id === dataset.id);

    return {
      dataset_id: dataset.id,
      catalog_id: hub.catalog.id,
      catalog_languages: hub.catalog.language,
      distributions: convertDistributions(dataset, hubDatasets),
      distributions_sample: convertToApplicationDatasetVariables(hubDatasets),

      country: {
        label: hub.country.label,
        country_id: hub.country.id,
        resource: hub.country.resource
      },

      hdab: hub.hdab,
      provenance: hub.provenance,
      publisher: hub.publisher,
      title: hub.title
    };
  });
};

export const convertDistributions = (dataset, hubDatasets) => {
  const hubDataset = hubDatasets.find(h => h.id === dataset.id);

  if (!hubDataset) {
    console.warn("Hub dataset not found for id:", dataset.id);
    return [];
  }

  const allHubDistributions = [
    ...(hubDataset.distributions ?? []),
    ...(hubDataset.distributions_sample ?? []),
    ...(hubDataset.distributions_analytics ?? [])
  ];

  return (dataset.distributions ?? []).map(dist => {
    const hubDist = allHubDistributions.find(hd => hd.id === dist.id);

    return {
      distribution_id: dist.id,
      title: hubDist?.title ?? null
    };
  });
};

export const convertDataForUpdateApplications = (applicationList, datasetBasketList, hubDatasets) => {
  return {
    applications: applicationList.map((applicationId) => {
      return {application_id: applicationId}
    }),
    datasets: convertDatasets(datasetBasketList, hubDatasets)
  }
}

export const convertToApplicationDatasetVariables = (hubDatasets) => {
  if (!Array.isArray(hubDatasets) || hubDatasets.length === 0) {
    return [];
  }

  return hubDatasets.map(dataset => {
    const datasetId = dataset?.id;
    const topLevelVariables = Array.isArray(dataset?.variables) ? dataset.variables : [];

    const seen = new Set();
    const uniqueVariables = [];

    topLevelVariables.forEach(variable => {
      const name = (variable?.name || "").trim();
      const datatype = (variable?.datatype || "").trim();
      const key = `${name}:::${datatype}`; // unique key

      if (name && !seen.has(key)) {
        seen.add(key);
        uniqueVariables.push({
          name,
          titles: variable?.titles,
          datatype,
          description: variable?.description,
          propertyUrl: variable?.propertyUrl || ""
        });
      }
    });

    return {
      datasetId,
      variables: uniqueVariables
    };
  });
};

