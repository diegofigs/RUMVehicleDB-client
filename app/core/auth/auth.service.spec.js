import chai from 'chai';
import authModule from './auth';

chai.should();

beforeEach(function() {
  angular.mock.module(authModule);
});

describe('AuthService', function() {
  let service;
  let $httpBackend;

  beforeEach(function() {
    inject(function($injector) {
      service = $injector.get('AuthService');
      $httpBackend = $injector.get('$httpBackend');
      delete service.$sessionStorage.token;
      delete service.$sessionStorage.user;
    });
  });

  describe('#authenticate()', function() {
    it('should give data to authorized users', function(done) {

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

    it('should emit error to unauthorized users', function(done) {
      // Mock a user with credentials
      let mockedUser = {email: 'test@upr.edu', password: 'SECRET'};

      // Mock error response from server
      let mockedError = {status: 500, message: 'Unauthorized user'};

      // Expect service to POST with user credentials
      // Mock 500 response with token
      $httpBackend
        .expect('POST', 'http://dev.uprm.edu/rumvehicles/api/v1/auth', mockedUser)
        .respond(500, mockedError);

      // Execute authenticate with mocked input
      service
        .authenticate(mockedUser)
        .catch(function(error) {
          should.exist(error);
          done();
        });

      // Emit responses from expected requests
      $httpBackend.flush(2);
    });
  });

  describe('#getUser()', function() {
    it('should return a user object to authorized users', function() {
      // Mock a user with credentials
      let mockedUser = {email: 'test@upr.edu', password: 'SECRET'};
      let mockedToken = {token: 'SECRET'};

      // Assign mocked data to service
      service.$sessionStorage.user = mockedUser;
      service.$sessionStorage.token = mockedToken;

      // Compare return value to mocked data for equality
      service.getUser().should.equal(mockedUser);
    });

    it('should return null to unauthorized users', function() {
      should.not.exist(service.getUser());
    });
  });

  describe('#getToken()', function() {
    it('should return a token if available', function() {
      // Mock a token
      let mockedToken = {token: 'SECRET'};

      // Assign mocked data to service
      service.$sessionStorage.token = mockedToken;

      // Compare return value to mocked data for equality
      service.getToken().should.equal(mockedToken);
    });
  });

  describe('#logOut()', function() {
    it('should remove user object and token', function() {
      // Mock a user with credentials
      let mockedUser = {email: 'test@upr.edu', password: 'SECRET'};
      let mockedToken = {token: 'SECRET'};

      // Assign mocked data to service
      service.$sessionStorage.user = mockedUser;
      service.$sessionStorage.token = mockedToken;

      service.logOut();

      should.not.exist(service.$sessionStorage.user);
      should.not.exist(service.$sessionStorage.token);
    })
  })

});
