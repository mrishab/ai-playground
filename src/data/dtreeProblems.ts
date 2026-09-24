export interface DTreeDataset {
  id: string;
  name: string;
  description: string;
  attributes: string[];
  target: string;
  attributeValues: Record<string, string[]>;
  examples: Record<string, string>[];
}

export const DTREE_DATASETS: Record<string, DTreeDataset> = {
  "playTennis": {
    "id": "playTennis",
    "name": "Play Tennis / Weather Dataset",
    "description": "The classic ID3 benchmark dataset from Quinlan: Predicting whether to play tennis based on Outlook, Temperature, Humidity, and Wind.",
    "attributes": [
      "Outlook",
      "Temperature",
      "Humidity",
      "Wind"
    ],
    "target": "Play",
    "attributeValues": {
      "Outlook": [
        "Sunny",
        "Overcast",
        "Rain"
      ],
      "Temperature": [
        "Hot",
        "Mild",
        "Cool"
      ],
      "Humidity": [
        "High",
        "Normal"
      ],
      "Wind": [
        "Weak",
        "Strong"
      ],
      "Play": [
        "Yes",
        "No"
      ]
    },
    "examples": [
      {
        "Outlook": "Sunny",
        "Temperature": "Hot",
        "Humidity": "High",
        "Wind": "Weak",
        "Play": "No"
      },
      {
        "Outlook": "Sunny",
        "Temperature": "Hot",
        "Humidity": "High",
        "Wind": "Strong",
        "Play": "No"
      },
      {
        "Outlook": "Overcast",
        "Temperature": "Hot",
        "Humidity": "High",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Rain",
        "Temperature": "Mild",
        "Humidity": "High",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Rain",
        "Temperature": "Cool",
        "Humidity": "Normal",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Rain",
        "Temperature": "Cool",
        "Humidity": "Normal",
        "Wind": "Strong",
        "Play": "No"
      },
      {
        "Outlook": "Overcast",
        "Temperature": "Cool",
        "Humidity": "Normal",
        "Wind": "Strong",
        "Play": "Yes"
      },
      {
        "Outlook": "Sunny",
        "Temperature": "Mild",
        "Humidity": "High",
        "Wind": "Weak",
        "Play": "No"
      },
      {
        "Outlook": "Sunny",
        "Temperature": "Cool",
        "Humidity": "Normal",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Rain",
        "Temperature": "Mild",
        "Humidity": "Normal",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Sunny",
        "Temperature": "Mild",
        "Humidity": "Normal",
        "Wind": "Strong",
        "Play": "Yes"
      },
      {
        "Outlook": "Overcast",
        "Temperature": "Mild",
        "Humidity": "High",
        "Wind": "Strong",
        "Play": "Yes"
      },
      {
        "Outlook": "Overcast",
        "Temperature": "Hot",
        "Humidity": "Normal",
        "Wind": "Weak",
        "Play": "Yes"
      },
      {
        "Outlook": "Rain",
        "Temperature": "Mild",
        "Humidity": "High",
        "Wind": "Strong",
        "Play": "No"
      }
    ]
  },
  "likesHoliday": {
    "id": "likesHoliday",
    "name": "Likes Holiday Dataset (AISpace)",
    "description": "Predicting whether a traveler enjoys a vacation destination based on Culture, Fly, Hot, Music, and Nature.",
    "attributes": [
      "Culture",
      "Fly",
      "Hot",
      "Music",
      "Nature"
    ],
    "target": "Likes",
    "attributeValues": {
      "Culture": [
        "0",
        "1"
      ],
      "Fly": [
        "0",
        "1"
      ],
      "Hot": [
        "0",
        "1"
      ],
      "Music": [
        "0",
        "1"
      ],
      "Nature": [
        "0",
        "1"
      ],
      "Likes": [
        "0",
        "1"
      ]
    },
    "examples": [
      {
        "Culture": "0",
        "Fly": "0",
        "Hot": "1",
        "Music": "0",
        "Nature": "0",
        "Likes": "0"
      },
      {
        "Culture": "0",
        "Fly": "1",
        "Hot": "1",
        "Music": "0",
        "Nature": "0",
        "Likes": "0"
      },
      {
        "Culture": "1",
        "Fly": "0",
        "Hot": "1",
        "Music": "1",
        "Nature": "0",
        "Likes": "1"
      },
      {
        "Culture": "1",
        "Fly": "1",
        "Hot": "0",
        "Music": "1",
        "Nature": "1",
        "Likes": "1"
      },
      {
        "Culture": "0",
        "Fly": "0",
        "Hot": "0",
        "Music": "0",
        "Nature": "1",
        "Likes": "0"
      },
      {
        "Culture": "1",
        "Fly": "1",
        "Hot": "1",
        "Music": "0",
        "Nature": "1",
        "Likes": "1"
      },
      {
        "Culture": "0",
        "Fly": "1",
        "Hot": "0",
        "Music": "1",
        "Nature": "0",
        "Likes": "0"
      },
      {
        "Culture": "1",
        "Fly": "0",
        "Hot": "0",
        "Music": "0",
        "Nature": "1",
        "Likes": "1"
      },
      {
        "Culture": "0",
        "Fly": "0",
        "Hot": "1",
        "Music": "1",
        "Nature": "1",
        "Likes": "0"
      },
      {
        "Culture": "1",
        "Fly": "1",
        "Hot": "1",
        "Music": "1",
        "Nature": "0",
        "Likes": "1"
      }
    ]
  },
  "likesTV": {
    "id": "likesTV",
    "name": "Likes TV Show Dataset (AISpace)",
    "description": "Predicting whether a viewer likes a television show based on Comedy, Doctors, Lawyers, and Guns.",
    "attributes": [
      "Comedy",
      "Doctors",
      "Lawyers",
      "Guns"
    ],
    "target": "Likes",
    "attributeValues": {
      "Comedy": [
        "false",
        "true"
      ],
      "Doctors": [
        "false",
        "true"
      ],
      "Lawyers": [
        "false",
        "true"
      ],
      "Guns": [
        "false",
        "true"
      ],
      "Likes": [
        "false",
        "true"
      ]
    },
    "examples": [
      {
        "Comedy": "false",
        "Doctors": "true",
        "Lawyers": "false",
        "Guns": "false",
        "Likes": "false"
      },
      {
        "Comedy": "true",
        "Doctors": "false",
        "Lawyers": "true",
        "Guns": "false",
        "Likes": "true"
      },
      {
        "Comedy": "false",
        "Doctors": "false",
        "Lawyers": "true",
        "Guns": "true",
        "Likes": "false"
      },
      {
        "Comedy": "true",
        "Doctors": "true",
        "Lawyers": "false",
        "Guns": "true",
        "Likes": "true"
      },
      {
        "Comedy": "false",
        "Doctors": "true",
        "Lawyers": "true",
        "Guns": "false",
        "Likes": "false"
      },
      {
        "Comedy": "true",
        "Doctors": "false",
        "Lawyers": "false",
        "Guns": "false",
        "Likes": "true"
      },
      {
        "Comedy": "false",
        "Doctors": "false",
        "Lawyers": "false",
        "Guns": "true",
        "Likes": "false"
      },
      {
        "Comedy": "true",
        "Doctors": "true",
        "Lawyers": "true",
        "Guns": "false",
        "Likes": "true"
      }
    ]
  }
};
