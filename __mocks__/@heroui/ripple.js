export const useRipple = jest.fn(() => ({
  onPress: jest.fn(),
  onPressStart: jest.fn(),
  onPressEnd: jest.fn(),
  onPressChange: jest.fn(),
  onPressUp: jest.fn(),
}));