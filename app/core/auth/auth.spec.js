import chai from 'chai';
import authModule from './auth';

chai.should();

describe('AuthModule', function() {
  beforeEach(function() {
    window.module(authModule);
  });

  describe('AuthService', function() {
    let service;
    let $httpBackend;

    beforeEach(function() {
      inject(function($injector) {
        service = $injector.get('AuthService');
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    it('should have function for logging out users', function() {
      service.should.have.property('logOut').that.is.a('function');
    });

    it('should have function for checking current user', function() {
      service.should.have.property('getUser').that.is.a('function');
    });

    it('should give authorized users their data', function(done) {
      // Mock a user with credentials
      let mockedUser = {email: 'test@upr.edu', password: 'SECRET'};
      let mockedToken = {token: 'SECRET'};
      let mockedDetails = {data: 'SECRET'};
      // Expect service to POST with user credentials
      // Mock 200 response with token
      $httpBackend
        .expect('POST', 'http://dev.uprm.edu/rumvehicles/api/v1/auth', mockedUser)
        .respond(200, mockedToken);
      // Expect service to GET user details with token
      // Mock 200 response with user data
      $httpBackend
        .expect('GET', 'http://dev.uprm.edu/rumvehicles/api/v1/auth/me')
        .respond(200, mockedDetails);

      // Execute authenticate with mocked input
      service
        .authenticate(mockedUser)
        .then(function(response) {
          let data = response;
          should.exist(data);
          data.should.equal(mockedDetails.data);
          done();
        });

      // Emit responses from expected requests
      $httpBackend.flush(2);
    });

  });

});
