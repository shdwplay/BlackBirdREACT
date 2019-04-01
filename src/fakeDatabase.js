import React from "react";
import packageImg from "./assets/package.jpg";

export const fakeDatabase = {
  users: {
    antoniopellegrini: {
      currentUser: "antoniopellegrini",
      name: "Antonio Pellegrini",
      favouritesActive: false,
      highlightedCard: null,
      page: "Messages",
      activeChat: {
        collocutor: "null",
        status: "null",
        messages: []
      },
      activeTab: "Messages",
      newMessage: "",
      searchToggle: false,
      querystr: "",
      currentCollocutor: null,
      userStatus: "away",
      collocutors: [
        {
          id: "chiarabaroni",
          name: "Chiara Baroni",
          displayName: "*TEST*",
          status: "online",
          favourite: false,
          silenced: false,
          lastOpened: 1553573343,
          lastMessage: {
            text: ":P",
            sender: "chiarabaroni",
            date: 1553591343
          },
          numUnread: 7,
          image: "/images/profile_james.png",
          messages: [
            {
              sender: "antoniopellegrini",
              text:
                "Hello, have you had a chance to check out the prototype I sent you?"
            },
            {
              sender: "chiarabaroni",
              text:
                "Hey sorry, not yet! I'll do it as soon as I get to the airport! I have a fligth at 5!"
            },
            {
              sender: "antoniopellegrini",
              text: "Ok great, let me know when you are done!"
            },
            {
              sender: "chiarabaroni",
              text: "Sure thing! 😊"
            },
            {
              sender: "chiarabaroni",
              text: "Btw was there a package for me in today's mail?"
            },
            {
              sender: "antoniopellegrini",
              text: "Yep! 😊"
            },
            {
              sender: "antoniopellegrini",
              text: <img className="Chat-message-img" src={packageImg} />
            }
          ]
        },
        {
          id: "edoardoaccivile",
          name: "Edoardo Accivile",
          displayName: "*TEST*",
          status: "online",
          favourite: true,
          silenced: true,
          lastOpened: 1553573343,
          lastMessage: {
            text: ":P",
            sender: "edoardoaccivile",
            date: 1553591343
          },
          numUnread: 5,
          image: "/images/profile_james.png",
          messages: [
            {
              sender: "antoniopellegrini",
              text: "Are you coming to the office tomorrow?"
            },
            {
              sender: "edoardoaccivile",
              text: "Dunno man"
            }
          ]
        },
        {
          id: "lorenzoiacobucci",
          name: "Lorenzo Iacobucci",
          displayName: "*TEST*",
          status: "away",
          favourite: true,
          silenced: false,
          lastOpened: 1553573343,
          numUnread: 0,
          image: "/images/profile_james.png",
          lastMessage: {
            text: ":P",
            sender: "antoniopellegrini",
            date: 1553591343
          },
          messages: [
            {
              sender: "antoniopellegrini",
              text: "Is the presentation ready?"
            },
            {
              sender: "lorenzoiacobucci",
              text: "Not yet"
            },
            {
              sender: "lorenzoiacobucci",
              text: "It will be done by tomorrow, is that ok?"
            },
            {
              sender: "antoniopellegrini",
              text: "Perfect!"
            }
          ]
        }
      ],
      contacts: [
        {
          id: "alessandraderossi",
          image: "/images/profile_alessandra.jpg",
          name: "Alessandra De Rossi",
          status: "away",
          messages: []
        },
        {
          id: "angelastewart",
          image: "/images/profile_angela.png",
          name: "Angela Stewart",
          status: "away",
          messages: []
        },
        {
          id: "jamesmcaville",
          image: "/images/profile_james.png",
          name: "James McAville",
          status: "away",
          messages: []
        },
        {
          id: "lucilledavis",
          image: "/images/profile_lucille.png",
          name: "Lucille Davis",
          status: "away",
          messages: []
        },
        {
          id: "francisscott",
          image: "/images/profile_francis.jpg",
          name: "Francis Scott",
          status: "away",
          messages: []
        },
        {
          id: "robertevans",
          image: "/images/profile_robert.jpg",
          name: "Robert Evans",
          status: "away",
          messages: []
        }
      ],
      userInfo: {
        email: "antoniopellegrini@born2code.com",
        nome: "Antonio Pellegrini",
        password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
      }
    },

    carlburns: {
      currentUser: "carlburns",
      name: "Carl Burns",
      favouritesActive: false,
      highlightedCard: null,
      page: "Messages",
      activeChat: {
        collocutor: "null",
        status: "null",
        messages: []
      },
      activeTab: "Messages",
      newMessage: "",
      searchToggle: false,
      querystr: "",
      currentCollocutor: null,
      userStatus: "online",
      collocutors: [
        {
          id: "amystuart",
          name: "Amy Stuart",
          displayName: "*TEST*",
          status: "online",
          favourite: false,
          silenced: false,
          lastOpened: 1553573343,
          lastMessage: {
            text: ":P",
            sender: "amystuart",
            date: 1553591343
          },
          numUnread: 7,
          image: "/images/profile_james.png",
          messages: [
            {
              sender: "carlburns",
              text:
                "Hello, have you had a chance to check out the prototype I sent you?"
            },
            {
              sender: "amystuart",
              text:
                "Hey sorry, not yet! I'll do it as soon as I get to the airport! I have a fligth at 5!"
            },
            {
              sender: "antoniopellegrini",
              text: "Ok great, let me know when you are done!"
            },
            {
              sender: "amystuart",
              text: "Sure thing! 😊"
            },
            {
              sender: "amystuart",
              text: "Btw was there a package for me in today's mail?"
            },
            {
              sender: "carlburns",
              text: "Yep! 😊"
            },
            {
              sender: "carlburns",
              text: <img className="Chat-message-img" src={packageImg} />
            }
          ]
        },
        {
          id: "federicosperduti",
          name: "Federico Sperduti",
          displayName: "*TEST*",
          status: "online",
          favourite: true,
          silenced: true,
          lastOpened: 1553573343,
          lastMessage: {
            text: ":P",
            sender: "federicosperduti",
            date: 1553591343
          },
          numUnread: 5,
          image: "/images/profile_james.png",
          messages: [
            {
              sender: "carlburns",
              text: "Are you coming to the office tomorrow?"
            },
            {
              sender: "federicosperduti",
              text: "Dunno man"
            }
          ]
        },
        {
          id: "lukeskywalker",
          name: "Luke Skywalker",
          displayName: "*TEST*",
          status: "away",
          favourite: true,
          silenced: false,
          lastOpened: 1553573343,
          numUnread: 0,
          image: "/images/profile_james.png",
          lastMessage: {
            text: ":P",
            sender: "carlburns",
            date: 1553591343
          },
          messages: [
            {
              sender: "carlburns",
              text: "Is the presentation ready?"
            },
            {
              sender: "lukeskywalker",
              text: "Not yet"
            },
            {
              sender: "lukeskywalker",
              text: "It will be done by tomorrow, is that ok?"
            },
            {
              sender: "carlburns",
              text: "Perfect!"
            }
          ]
        }
      ],
      contacts: [
        {
          id: "alessandraderossi",
          image: "/images/profile_alessandra.jpg",
          name: "Alessandra De Rossi",
          status: "away",
          messages: []
        },
        {
          id: "angelastewart",
          image: "/images/profile_angela.png",
          name: "Angela Stewart",
          status: "away",
          messages: []
        },
        {
          id: "jamesmcaville",
          image: "/images/profile_james.png",
          name: "James McAville",
          status: "away",
          messages: []
        },
        {
          id: "lucilledavis",
          image: "/images/profile_lucille.png",
          name: "Lucille Davis",
          status: "away",
          messages: []
        },
        {
          id: "francisscott",
          image: "/images/profile_francis.jpg",
          name: "Francis Scott",
          status: "away",
          messages: []
        },
        {
          id: "robertevans",
          image: "/images/profile_robert.jpg",
          name: "Robert Evans",
          status: "away",
          messages: []
        }
      ],
      userInfo: {
        email: "antoniopellegrini@born2code.com",
        nome: "Antonio Pellegrini",
        password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
      }
    }
  }
};
