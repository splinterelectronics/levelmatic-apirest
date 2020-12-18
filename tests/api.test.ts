import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const url = 'http://localhost:3000';

const user = {
  email: 'jomiva1650@gmail.com',
  password: '123456',
  uid: '',
  tokenJWT: '',
  devices: '',
};

const userNotVerified = {
  email: 'josevalera9801@gmail.com',
  password: '59b588c6f5',
};

const { email, password } = user;

const levelmaticDevice = {
  ipNet: '192.168.0.103',
  wifiPassword: '26540mj522',
  wifiSSID: 'Palixmajo',
};

const espDataToUpdate = {
  id: '2cf4324eb1d02cf4324eb380',
  minLevel: Math.floor(Math.random() * 100),
  name: `Tanque ${Math.floor(Math.random() * 100)}`,
  notification: Math.random() < 0.5,
};

describe('Create user', () => {
  it('should create a new user ', (done) => {
    chai
      .request(url)
      .post('/user')
      .send({
        username: '',
        email: userNotVerified.email,
        password: userNotVerified.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property(
          'message',
          'El usuario ha sido creado exitosamente'
        );
        done();
      });
  });

  it('should NOT create a new user (already created)', (done) => {
    chai
      .request(url)
      .post('/user')
      .send({ username: '', email, password })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('ok', false);
        expect(res.body).to.have.property(
          'message',
          'Ya hay un usuario registrado con ese email'
        );
        done();
      });
  });
});

describe('Login user', () => {
  it('should log user', (done) => {
    chai
      .request(url)
      .post('/user/login')
      .send({ email, password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('devices').to.be.an('array');
        expect(res.body).to.have.property('tokenJWT');
        expect(res.body).to.have.property('uid').to.be.an('string').length(24);
        expect(res.body).to.have.property('email', email);
        user.uid = res.body.uid;
        user.tokenJWT = res.body.tokenJWT;
        user.devices = res.body.devices;
        done();
      });
  });

  it('should NOT log user (incorrect password)', (done) => {
    chai
      .request(url)
      .post('/user/login')
      .send({ email, password: `${password}xx` })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('ok', false);
        expect(res.body).to.have.property(
          'message',
          'credenciales incorrectas'
        );
        done();
      });
  });

  it('should NOT log user (email not verified)', (done) => {
    chai
      .request(url)
      .post('/user/login')
      .send({
        email: userNotVerified.email,
        password: userNotVerified.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('ok', false);
        expect(res.body).to.have.property(
          'message',
          'El usuario no ha sido verificado'
        );
        done();
      });
  });
});

describe('Adding levelmatic to user', () => {
  it('should add a levelmatic to user', (done) => {
    chai
      .request(url)
      .put('/user/device')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .send(levelmaticDevice)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('devices').to.be.an('array');
        done();
      });
  });

  it('should NOT add a levelmatic to user (incorrect tokenJWT)', (done) => {
    chai
      .request(url)
      .put('/user/device')
      .set('Authorization', `Bearer ${user.tokenJWT}1`)
      .send(levelmaticDevice)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should NOT add a levelmatic to user (levelmatic does not exist)', (done) => {
    chai
      .request(url)
      .put('/user/device')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .send({
        ipNet: levelmaticDevice.ipNet,
        wifiSSID: '192.168.0.999',
        wifiPassword: levelmaticDevice.wifiPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('ok', false);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('Updating esp (RXTX) data', () => {
  it('should update esp', (done) => {
    chai
      .request(url)
      .put('/esp')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .send(espDataToUpdate)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('espUpdated').to.be.an('object');
        expect(res.body.espUpdated).to.have.property('_id', espDataToUpdate.id);
        expect(res.body.espUpdated).to.have.property(
          'minLevel',
          espDataToUpdate.minLevel
        );
        expect(res.body.espUpdated).to.have.property(
          'name',
          espDataToUpdate.name
        );
        expect(res.body.espUpdated).to.have.property(
          'notification',
          espDataToUpdate.notification
        );
        done();
      });
  });

  it('should NOT update esp (incorrect tokenJWT)', (done) => {
    chai
      .request(url)
      .put('/esp')
      .set('Authorization', `Bearer ${user.tokenJWT}+`)
      .send(espDataToUpdate)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Getting measures by range and idESP', () => {
  it('should get liquidLevels and dataX array with 1m', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '1m' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('liquidLevels').to.be.an('array');
        expect(res.body).to.have.property('dataX').to.be.an('array');
        done();
      });
  });

  it('should get liquidLevels and dataX array with 7d', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '7d' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('liquidLevels').to.be.an('array');
        expect(res.body).to.have.property('dataX').to.be.an('array');
        done();
      });
  });

  it('should get liquidLevels and dataX array with 1d', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '1d' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('liquidLevels').to.be.an('array');
        expect(res.body).to.have.property('dataX').to.be.an('array');
        done();
      });
  });

  it('should get liquidLevels and dataX array with 6h', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '6h' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('liquidLevels').to.be.an('array');
        expect(res.body).to.have.property('dataX').to.be.an('array');
        done();
      });
  });

  it('should get liquidLevels and dataX array with 1h', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '1h' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('liquidLevels').to.be.an('array');
        expect(res.body).to.have.property('dataX').to.be.an('array');
        done();
      });
  });

  it('should get error query string not allowed', (done) => {
    chai
      .request(url)
      .get('/measure')
      .query({ idESP: espDataToUpdate.id, range: '2h' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Getting devices array by user tokenJWT', () => {
  it('should get devices array', (done) => {
    chai
      .request(url)
      .get('/user/devices')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('devices').to.be.an('array');
        done();
      });
  });

  it('should NOT get devices array (incorrect tokenJWT)', (done) => {
    chai
      .request(url)
      .get('/user/devices')
      .set('Authorization', `Bearer ${user.tokenJWT}+`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Updating user password', () => {
  it('should NOT update user password (incorrect current password)', (done) => {
    chai
      .request(url)
      .put('/user')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .send({
        password: `${password}1`,
        newPassword: '654321',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('ok', false);
        done();
      });
  });

  it('should NOT update user password (incorrect tokenJWT)', (done) => {
    chai
      .request(url)
      .put('/user')
      .set('Authorization', `Bearer ${user.tokenJWT}1`)
      .send({
        password,
        newPassword: '654321',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should update user password', (done) => {
    const newPassword = 'qazwsx';
    chai
      .request(url)
      .put('/user')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .send({
        password,
        newPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        user.password = newPassword;
        done();
      });
  });

  it('should login with new user password', (done) => {
    chai
      .request(url)
      .post('/user/login')
      .send({ email, password: user.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('devices').to.be.an('array');
        expect(res.body).to.have.property('tokenJWT');
        expect(res.body).to.have.property('uid', user.uid);
        expect(res.body).to.have.property('email', email);
        done();
      });
  });
});

describe('Generating new tokenJWT', () => {
  it('should generate new tokenJWT', (done) => {
    chai
      .request(url)
      .get('/user/renew')
      .set('Authorization', `Bearer ${user.tokenJWT}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('tokenJWT').to.be.a('string');
        done();
      });
  });

  it('should NOT generate new tokenJWT (incorrect tokenJWT)', (done) => {
    chai
      .request(url)
      .get('/user/renew')
      .set('Authorization', `Bearer ${user.tokenJWT}1`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
