// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginWithUI', () => {
  cy.visit('https://ipa.ucdavis.edu');

  cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('hide_sidebar_menu is not defined');

    // using mocha's async done callback to finish
    // this test so we prove that an uncaught exception
    // was thrown
    done();

    // return false to prevent the error from
    // failing this test
    return false;
  });

  cy.contains('Log in').click();
  cy.get('#username').type(Cypress.env('username'));
  cy.get('#password').type(Cypress.env('password'));
  cy.get('#submit').click();
});

Cypress.Commands.add('loginAndVisit', optionalPath => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  // grab execution value from cas login page?
  //     cy.get("input[name='execution']").then($input => {
  //   console.log($input.val());
  // });

  cy.request({
    method: 'POST',
    url: 'https://cas.ucdavis.edu/cas/login',
    form: true,
    body: {
      username,
      password,
      _eventId: 'submit',
      submit: 'LOGIN',
      execution:
        '5bd55622-2be3-4011-b1b1-8320fa9cf611_ZXlKaGJHY2lPaUpJVXpVeE1pSjkuVnpsbFJGUnZielpYVDI5clZsVm5la1I2WWpkU1RWSkRZMHR3ZG05SlRGaHBRVVJ6Vmt0UVYxQjZMMUowTDNGdlFucGFWVVU1ZFhOTFRVRTVNWHBzUkc5V2RHRjJaRWx6UVZWNlNYWkJPRmRMYlhOUmRGUmlXa2c0U1VkWWRVMU1SSE1yUVVKdmR5dGxTbFJ5TWpCMFRHSllkRzAxVFhScmNrbFlZMHB4VVRsQ1pFVXpMMmhaWW14T1FVUm1ielZWVWxWa01rUkljRzlOTDBKc2FXSlNVamt6T0Vwak9VczJhM0JGWkZWRFRsQlhTWFZzVGpoU05VNVNjMFV2Y0dVMmIwSTNZV0p2VERCM2VUUndRV2d3TUdFd2RrOUNURFpxVW1OVVJ6VjNOakF6SzFkR1VEbFpZMDVQWlZCRVRHRmhkMmhFV1dOV1dIcHVPREJwT1dzd01VeDJla2hGWlhGeGRVeFNXRWRtYjFKM1JVbDRSR3BJTTFkblZ5dEJiR2xzVFVrd1UwaHZUWFZRVVhWc1FYRnJNMVF5Tm5wR1VVd3pXRXhTTTJZeWNHOUJhV1Z6TjFKMlFYQm1aMUY2Um1kVU5ERnZTMmxLVmxOWGIwMWlhelpvUm5CMFNucEJlVXByV0ZWbFlXSXdTM1F2UzNsMGExTkZZemhYZDFOaU1qaG1UMDh6VEhSSmNYWlpiVWwwVG1GVk1VVXdWV0pCU0ZBMVkzTnhObUZUY1RSM01saFFNemN6TlVveVFUbHNSVEpsYVhobkwzTkxLMVl3TXpOMU1qaExPR1lyU1RSa2RIaGhlV1F2TVRkNlNVWnRjRVZ3ZEU5a2EyWk5XbkpCYlhRd1NrZHhTRkpzWkRKUVJYcHZiMkZNWlU5SFUweHNiekpYZFN0bldXSnlkV2huUlRkM2FsRTBRamhZVlZCbWREVklOMVZJUzBsS1dYVkdjV3RRWkVwcldrOXdNazVFWm5GM05tZDVhSGxoT1hneE5FTkdNMlZIUmpCaGRFY3phM0V3V25NME9YTkJURXB5VUdwSmVIQnBaemhzVVV0b1dVRldaSEZhY2t0MFdUbEtMM1JOVVROelFsazNXRGgzV25GSVNuQjFiVzR6UjB4T2QxaDZNMkZCV1haYVJVdFpZMk5wU0VWSWNHRTFSamt5VGxCd09USmljbGxPZG1vNFR6bG5PRlJHZUVsd1dtUjRXRlpGVUVOWU9XYzVUMkpwTVRGM1MwWkJjRU5qWTBwWlVFdzRPREp0YkUxWGREbEVWVk5aSzJ4aVYxa3liRFV2UTNsYVQyeGhVMlJSYUZaQmVXTlFWbkZaVjIxM2RuSnphRlptTVRGaE1VeFNZakpEU3pGWlFXazBPVTF0SzBwdVNGRnhkWGhtT0RZMlYwcG9WM0JCYWtkR1NYVk1WWEkyUVUxamQySmliVnBNYzNwNFZFWTVaVEJCWkVSYVduTkllRzVQS3pFME5uSXZXV3BPVDJ0R1JYSXdXVGhpTlZWSVZXdGxjMWxWU2xSSlNIaG5Vamw0YjJOalkyZE9ORkV3T0hkalYyZHJPVEJVU0UxWFRXeFhNbE12TUhCb1RWRjBObEkyY2paSWVVdzBiV0ZDU1ZaVEwycGplakZ2UlRFNEx6QnRLMVpqWm5BMlJsSjVRMFprWm05aVV6TnhRVUp4UVdKRmRUSmxWRmxQVlV0a01YSmxURGgwY2tNeVRrWlllbHA2VW5GYVJFWndXa2R6ZG1ncllWRjVXRWxKZVhNMlkzcFRNRVpQVG5JeVpIbzBaVmxFZUZKVmVYQTRiek5tYUhwNGQyUnVkRlp3WldkSWQyeHVTVmxKYlRGdGVVaHVTbFpOWldwcmRHOWhXVzE1YzFsaFJGa3ZRbVZMVldVM2VFazkuaWs4N1c2VWFYNmdCeGJ4T0Z5dW5RaDJidWg3OTRGc0FKbkpfeG10cnVKSUdpNTFuWWJMZGh2RnlQamJleG1TUzNBOUc3QTItaDZBbndlY1ppQmtZdFE='
    }
  });
  // .then(res => {
  //   console.log(res);
  // });

  if (optionalPath) {
    cy.visit(optionalPath);
  } else {
    cy.visit('/summary');
  }
  // cy.getCookie('TGC');
});
